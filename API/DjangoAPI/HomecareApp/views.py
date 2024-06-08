from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import (ClientContact, Customer, Caregiver, CaregiverContact, Service, Schedule, Billing, Admin, Message)
from .serializers import (ClientContactSerializer, CustomerSerializer, CaregiverSerializer, CaregiverContactSerializer, ServiceSerializer, ScheduleSerializer, BillingSerializer, AdminSerializer, MessageSerializer)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def client_contact_api(request, id=None):
    if request.method == 'GET':
        if id:
            contact = ClientContact.objects.get(pk=id)
            serializer = ClientContactSerializer(contact)
        else:
            contacts = ClientContact.objects.all()
            serializer = ClientContactSerializer(contacts, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ClientContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        contact = ClientContact.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = ClientContactSerializer(contact, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        contact = ClientContact.objects.get(pk=id)
        contact.delete()
        return JsonResponse({'message': 'Client Contact was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def caregiver_api(request, id=None):
    if request.method == 'GET':
        if id:
            caregiver = Caregiver.objects.get(pk=id)
            serializer = CaregiverSerializer(caregiver)
        else:
            caregivers = Caregiver.objects.all()
            serializer = CaregiverSerializer(caregivers, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CaregiverSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        caregiver = Caregiver.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = CaregiverSerializer(caregiver, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        caregiver = Caregiver.objects.get(pk=id)
        caregiver.delete()
        return JsonResponse({'message': 'Caregiver was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def caregiver_contact_api(request, id=None):
    if request.method == 'GET':
        if id:
            caregiver_contact = CaregiverContact.objects.get(pk=id)
            serializer = CaregiverContactSerializer(caregiver_contact)
        else:
            caregiver_contacts = CaregiverContact.objects.all()
            serializer = CaregiverContactSerializer(caregiver_contacts, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CaregiverContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        caregiver_contact = CaregiverContact.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = CaregiverContactSerializer(caregiver_contact, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        caregiver_contact = CaregiverContact.objects.get(pk=id)
        caregiver_contact.delete()
        return JsonResponse({'message': 'CaregiverContact was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

# Example structure for additional entities like Customer
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def customer_api(request, id=None):
    if request.method == 'GET':
        if id:
            customer = Customer.objects.get(pk=id)
            serializer = CustomerSerializer(customer)
        else:
            customers = Customer.objects.all()
            serializer = CustomerSerializer(customers, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'PUT':
        customer = Customer.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = CustomerSerializer(customer, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        customer = Customer.objects.get(pk=id)
        customer.delete()
        return JsonResponse({'message': 'Customer was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

# Repeat the above structure for Customer, Caregiver, CaregiverContact, Service, Schedule, Billing, Admin, and Message
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def service_api(request, id=None):
    if request.method == 'GET':
        if id:
            service = Service.objects.get(pk=id)
            serializer = ServiceSerializer(service)
        else:
            services = Service.objects.all()
            serializer = ServiceSerializer(services, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ServiceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        service = Service.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = ServiceSerializer(service, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        service = Service.objects.get(pk=id)
        service.delete()
        return JsonResponse({'message': 'Service was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def schedule_api(request, id=None):
    if request.method == 'GET':
        if id:
            schedule = Schedule.objects.get(pk=id)
            serializer = ScheduleSerializer(schedule)
        else:
            schedules = Schedule.objects.all()
            serializer = ScheduleSerializer(schedules, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ScheduleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        schedule = Schedule.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = ScheduleSerializer(schedule, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        schedule = Schedule.objects.get(pk=id)
        schedule.delete()
        return JsonResponse({'message': 'Schedule was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def billing_api(request, id=None):
    if request.method == 'GET':
        if id:
            billing = Billing.objects.get(pk=id)
            serializer = BillingSerializer(billing)
        else:
            billings = Billing.objects.all()
            serializer = BillingSerializer(billings, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BillingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        billing = Billing.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = BillingSerializer(billing, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        billing = Billing.objects.get(pk=id)
        billing.delete()
        return JsonResponse({'message': 'Billing was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def admin_api(request, id=None):
    if request.method == 'GET':
        if id:
            admin = Admin.objects.get(pk=id)
            serializer = AdminSerializer(admin)
        else:
            admins = Admin.objects.all()
            serializer = AdminSerializer(admins, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AdminSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        admin = Admin.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = AdminSerializer(admin, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        admin = Admin.objects.get(pk=id)
        admin.delete()
        return JsonResponse({'message': 'Admin was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def message_api(request, id=None):
    if request.method == 'GET':
        if id:
            message = Message.objects.get(pk=id)
            serializer = MessageSerializer(message)
        else:
            messages = Message.objects.all()
            serializer = MessageSerializer(messages, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        message = Message.objects.get(pk=id)
        data = JSONParser().parse(request)
        serializer = MessageSerializer(message, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        message = Message.objects.get(pk=id)
        message.delete()
        return JsonResponse({'message': 'Message was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
