from rest_framework import serializers
from .models import (
    ClientContact, Customer, Caregiver, CaregiverContact,
    Service, Schedule, Billing, Admin, Message
)

class ClientContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientContact
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class CaregiverContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaregiverContact
        fields = '__all__'

class CaregiverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caregiver
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'

class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = '__all__'

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    admin = serializers.StringRelatedField()  # Ensures admin is represented by its string representation

    class Meta:
        model = Message
        fields = '__all__'
