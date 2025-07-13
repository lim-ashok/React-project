"""
URL configuration for authentication app.

This module defines the URL patterns for user authentication endpoints:
- login: POST request to authenticate user
- signup: POST request to create new user
- logout: POST request to logout user
- check_auth: GET request to check if user is authenticated
"""
from django.urls import path
from . import views

urlpatterns = [
    # POST /api/auth/login/ - User login
    path('login/', views.login_view, name='login'),
    
    # POST /api/auth/signup/ - User registration
    path('signup/', views.signup_view, name='signup'),
    
    # POST /api/auth/logout/ - User logout
    path('logout/', views.logout_view, name='logout'),
    
    # GET /api/auth/check/ - Check if user is authenticated
    path('check/', views.check_auth_view, name='check_auth'),
]