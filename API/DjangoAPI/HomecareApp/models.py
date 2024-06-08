from django.db import models

class ClientContact(models.Model):
    phone = models.BigIntegerField()
    email = models.EmailField()
    address = models.CharField(max_length=255)

class Customer(models.Model):
    name = models.CharField(max_length=255)
    contact_info = models.ForeignKey(ClientContact, on_delete=models.CASCADE, related_name='customers')
    address = models.CharField(max_length=255)
    dob = models.DateField()
    medical_history = models.TextField()
    preferred_language = models.CharField(max_length=50)
    emergency_contacts = models.CharField(max_length=255)

class CaregiverContact(models.Model):
    phone = models.BigIntegerField()
    address = models.CharField(max_length=255)
    email = models.EmailField()

class Caregiver(models.Model):
    name = models.CharField(max_length=255)
    contact_information = models.ForeignKey(CaregiverContact, on_delete=models.CASCADE, related_name='caregivers')
    address = models.CharField(max_length=255)
    specialization = models.CharField(max_length=50)
    availability = models.CharField(max_length=50)
    salary = models.IntegerField()
    experience = models.IntegerField()

class Service(models.Model):
    service_type = models.CharField(max_length=50)
    description = models.TextField()
    duration = models.TimeField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    date_started = models.DateField()

class Schedule(models.Model):
    scheduled_time = models.DateTimeField()
    booked_date = models.DateField()
    feedback = models.IntegerField()
    caregiver = models.ForeignKey(Caregiver, on_delete=models.CASCADE, related_name='schedules')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='schedules')

class Billing(models.Model):
    invoice_id = models.IntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=50)
    payment_method = models.CharField(max_length=50)
    date = models.DateField()
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, related_name='billings')

class Admin(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    contact_details = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    hashed_password = models.CharField(max_length=255)
    last_login = models.DateField()

class Message(models.Model):
    message_content = models.CharField(max_length=255)
    message_status = models.CharField(max_length=25)
    admin = models.ForeignKey(Admin, on_delete=models.CASCADE, related_name='messages')
