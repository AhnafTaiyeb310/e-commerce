import os
import django
import json
import urllib.request
import urllib.error
from django.core.files.base import ContentFile
from django.utils.text import slugify
from decimal import Decimal

# 1. Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.local')
django.setup()

from e_commerce.store.models import (
    Product, ProductVariant, ProductType, Category, 
    Collection, AttributeType, AttributeValue, ProductImage
)

# Configuration for Representative Images
CATEGORY_IMAGES = {
    "Shoes": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "Running": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "Sneakers": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "Boots": "https://images.unsplash.com/photo-1608256246200-53e635b5b65f",
    "Heels": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    "Flats": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
    "Sandals": "https://images.unsplash.com/photo-1562273103-912067dec318",
    "Shirts": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "Tops": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "Casual": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "Pants": "https://images.unsplash.com/photo-1542272604-787c3835535d",
    "Bottoms": "https://images.unsplash.com/photo-1542272604-787c3835535d",
    "Suits": "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
    "Dresses": "https://images.unsplash.com/photo-1539008835757-c68291118173",
    "Outerwear": "https://images.unsplash.com/photo-1591047134402-234122d1feaa",
    "Swimming": "https://images.unsplash.com/photo-1530549387074-d5624d6ddf8e",
    "Yoga": "https://images.unsplash.com/photo-1518459031867-a89b944bffe4",
    "Activewear": "https://images.unsplash.com/photo-1518459031867-a89b944bffe4",
    "Training": "https://images.unsplash.com/photo-1518459031867-a89b944bffe4",
    "Watches": "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "Bags": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    "Jewelry": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    "Belts": "https://images.unsplash.com/photo-1624222247344-550fb8ecf7c2",
    "Hats": "https://images.unsplash.com/photo-1521369909029-2af58827466d",
    "Accessories": "https://images.unsplash.com/photo-1624222247344-550fb8ecf7c2",
}

# 2. Load Data from JSON file
JSON_FILE_PATH = os.path.join(os.path.dirname(__file__), 'myseed.json')
IMAGE_CACHE = {}

def get_or_create_category_path(category_name, subcategory_name):
    """Handles hierarchical categories from the JSON structure using unique name lookup"""
    # Parent category - lookup by name alone to satisfy unique=True
    parent, _ = Category.objects.get_or_create(
        name=category_name,
        defaults={'slug': slugify(category_name)}
    )
    
    # Subcategory - lookup by name alone
    child, _ = Category.objects.get_or_create(
        name=subcategory_name,
        defaults={'parent': parent, 'slug': slugify(subcategory_name)}
    )
    return child

def seed_data():
    if not os.path.exists(JSON_FILE_PATH):
        print(f"Error: {JSON_FILE_PATH} not found.")
        return

    with open(JSON_FILE_PATH, 'r') as f:
        data = json.load(f)

    print(f"Starting seed process for {len(data)} products from JSON...")
    
    for item in data:
        try:
            # 1. Product Type
            pt_name = item.get('category', 'General')
            product_type, _ = ProductType.objects.get_or_create(
                name=pt_name,
                defaults={'slug': slugify(pt_name)}
            )

            # 2. Category
            subcategory = item.get('subcategory', 'General')
            category = get_or_create_category_path(pt_name, subcategory)

            # 3. Product
            product, created = Product.objects.update_or_create(
                title=item['product_name'],
                defaults={
                    'description': f"Premium {item['product_name']} from {item['brand']}.",
                    'brand': item['brand'],
                    'product_type': product_type,
                    'category': category,
                    'base_price': Decimal(str(item['price'])),
                    'slug': slugify(f"{item['product_name']}-{item['sku']}")
                }
            )

            # 4. Image Handling (with 404 and 'str' object fix)
            image_url = CATEGORY_IMAGES.get(subcategory) or CATEGORY_IMAGES.get(pt_name) or CATEGORY_IMAGES.get('Accessories')
            
            if image_url and not ProductImage.objects.filter(product=product).exists():
                try:
                    if image_url not in IMAGE_CACHE:
                        print(f"  Downloading representative image for {subcategory}...")
                        req = urllib.request.Request(image_url, headers={'User-Agent': 'Mozilla/5.0'})
                        with urllib.request.urlopen(req) as response:
                            IMAGE_CACHE[image_url] = response.read()
                    
                    img_content = IMAGE_CACHE[image_url]
                    file_name = f"{slugify(subcategory)}.jpg"
                    
                    # Fix: Assign ContentFile directly to the field and create
                    ProductImage.objects.create(
                        product=product,
                        image=ContentFile(img_content, name=file_name),
                        alt_text=product.title,
                        is_primary=True
                    )
                except urllib.error.HTTPError as e:
                    print(f"  Skipping image for {product.title} (HTTP Error {e.code})")
                except Exception as e:
                    print(f"  Image upload failed for {product.title}: {e}")

            # 5. Variant
            variant, v_created = ProductVariant.objects.update_or_create(
                sku=item['sku'],
                defaults={
                    'product': product,
                    'inventory': 100 if item.get('in_stock', True) else 0,
                    'track_inventory': True,
                    'is_active': True,
                }
            )
            
        except Exception as e:
            print(f"Error seeding product '{item.get('product_name')}': {e}")

    print("\nSeeding completed successfully!")

if __name__ == "__main__":
    seed_data()
