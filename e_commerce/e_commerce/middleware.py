# middleware.py
from django.db import connection

class QueryCountMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Only inject if we are in debug mode
        from django.conf import settings
        if settings.DEBUG:
            total_time = sum(float(q['time']) for q in connection.queries)
            response['X-Query-Count'] = len(connection.queries)
            response['X-Total-SQL-Time'] = f"{total_time}s"
        return response