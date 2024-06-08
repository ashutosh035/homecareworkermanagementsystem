from django.urls import path
from . import views

urlpatterns = [
    path('client_contacts/', views.client_contact_api),
    path('client_contacts/<int:id>/', views.client_contact_api),
    path('customers/', views.customer_api),
    path('customers/<int:id>/', views.customer_api),
    path('caregiver_contacts/', views.caregiver_contact_api),
    path('caregiver_contacts/<int:id>/', views.caregiver_contact_api),
    path('caregivers/', views.caregiver_api),
    path('caregivers/<int:id>/', views.caregiver_api),
    path('services/', views.service_api),
    path('services/<int:id>/', views.service_api),
    path('schedules/', views.schedule_api),
    path('schedules/<int:id>/', views.schedule_api),
    path('billings/', views.billing_api),
    path('billings/<int:id>/', views.billing_api),
    path('admins/', views.admin_api),
    path('admins/<int:id>/', views.admin_api),
    path('messages/', views.message_api),
    path('messages/<int:id>/', views.message_api),
]
