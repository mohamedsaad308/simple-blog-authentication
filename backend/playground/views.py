from .tasks import notify_customers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class HelloWorldView(APIView):
    def get(self, request):
        data = {"message": "Hello, World!"}
        notify_customers.delay("Hello")
        return Response(data, status=status.HTTP_200_OK)
