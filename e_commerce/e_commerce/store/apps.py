from django.apps import AppConfig


class StoreConfig(AppConfig):
    name = 'e_commerce.store'

    def ready(self):
        import e_commerce.store.signals.signals
