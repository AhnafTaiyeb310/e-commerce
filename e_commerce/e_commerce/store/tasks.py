import os
import logging
import time
from celery import shared_task
from django.apps import apps
from django.conf import settings
from django.core.files import File
import cloudinary.uploader

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3)
def upload_image_to_cloudinary_task(self, app_label, model_name, object_id, field_name, temp_file_path):
    """
    Background task to upload a local temporary file to Cloudinary and attach it to the model.
    """
    Model = apps.get_model(app_label, model_name)
    try:
        obj = Model.objects.get(pk=object_id)
    except Model.DoesNotExist:
        logger.error(f"Object {model_name} with pk {object_id} not found.")
        # Clean up temp file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
        return

    if not os.path.exists(temp_file_path):
        logger.error(f"Temp file {temp_file_path} not found for {model_name} {object_id}.")
        if hasattr(obj, 'upload_status'):
            obj.upload_status = 'F'
            obj.save(update_fields=['upload_status'])
        return

    try:
        # Use official Cloudinary uploader to upload the local temp file
        upload_result = cloudinary.uploader.upload(
            temp_file_path,
            folder=getattr(obj.image, 'folder', 'uploads'), # Use folder from field if defined
            use_filename=True,
            unique_filename=True
        )
        
        # Save the Cloudinary Public ID / resource to the field
        # CloudinaryField stores the Public ID or a CloudinaryResource object
        obj.image = upload_result['public_id']
        
        if hasattr(obj, 'upload_status'):
            obj.upload_status = 'C'
        obj.save()
            
        logger.info(f"Successfully uploaded image to Cloudinary for {model_name} {object_id}")

    except Exception as exc:
        logger.exception(f"Exception during async upload for {model_name} {object_id}.")
        if hasattr(obj, 'upload_status'):
            obj.upload_status = 'F'
            obj.save(update_fields=['upload_status'])
        
        # Retry with exponential backoff on failure
        raise self.retry(exc=exc, countdown=60 * (2 ** self.request.retries))

    finally:
        # 3. Always clean up the local temporary file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)
            logger.info(f"Cleaned up temp file: {temp_file_path}")

@shared_task
def sweep_stale_temp_files_task():
    """
    Periodic task to sweep and delete any temporary upload files older than 24 hours.
    To catch any orphaned files from failed uploads/tasks.
    """
    tmp_dir = os.path.join(settings.BASE_DIR, 'tmp_uploads')
    if not os.path.exists(tmp_dir):
        logger.info("tmp_uploads dir does not exist. Nothing to sweep.")
        return

    now = time.time()
    deleted_count = 0
    # Sweep files older than 24 hours
    for filename in os.listdir(tmp_dir):
        filepath = os.path.join(tmp_dir, filename)
        if os.path.isfile(filepath):
            # Check modification time
            if os.stat(filepath).st_mtime < now - 24 * 3600:
                try:
                    os.remove(filepath)
                    deleted_count += 1
                except OSError as e:
                    logger.error(f"Failed to delete stale temp file {filepath}: {e}")
                    
    logger.info(f"Sweep stale temp files complete. Deleted {deleted_count} files.")
