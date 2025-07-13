"""
Authentication views for user login, signup, logout, and authentication check.

This module contains view functions that handle:
1. User login - authenticate existing users
2. User signup - create new user accounts
3. User logout - end user sessions
4. Auth check - verify if user is currently authenticated

All views return JSON responses to work with React frontend.
"""

import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required


@csrf_exempt  # Disable CSRF for API endpoint (use with caution in production)
@require_http_methods(["POST"])  # Only allow POST requests
def login_view(request):
    """
    Handle user login requests.
    
    Expected POST data:
    {
        "username": "user_username",
        "password": "user_password"
    }
    
    Returns:
    - Success: {"success": True, "message": "Login successful"}
    - Failure: {"success": False, "message": "Error message"}
    """
    try:
        # Parse JSON data from request body
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        # Validate that both username and password are provided
        if not username or not password:
            return JsonResponse({
                'success': False,
                'message': 'Username and password are required'
            }, status=400)
        
        # Authenticate user with Django's authentication system
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # User exists and password is correct
            login(request, user)  # Log the user in (creates session)
            return JsonResponse({
                'success': True,
                'message': 'Login successful',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            })
        else:
            # Authentication failed
            return JsonResponse({
                'success': False,
                'message': 'Invalid username or password'
            }, status=401)
            
    except json.JSONDecodeError:
        # Invalid JSON in request body
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        # Handle any other unexpected errors
        return JsonResponse({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }, status=500)


@csrf_exempt  # Disable CSRF for API endpoint
@require_http_methods(["POST"])  # Only allow POST requests
def signup_view(request):
    """
    Handle user registration requests.
    
    Expected POST data:
    {
        "username": "desired_username",
        "email": "user@example.com",
        "password": "user_password",
        "password_confirm": "user_password"
    }
    
    Returns:
    - Success: {"success": True, "message": "Account created successfully"}
    - Failure: {"success": False, "message": "Error message"}
    """
    try:
        # Parse JSON data from request body
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        password_confirm = data.get('password_confirm')
        
        # Validate required fields
        if not all([username, email, password, password_confirm]):
            return JsonResponse({
                'success': False,
                'message': 'All fields are required'
            }, status=400)
        
        # Check if passwords match
        if password != password_confirm:
            return JsonResponse({
                'success': False,
                'message': 'Passwords do not match'
            }, status=400)
        
        # Check if username already exists
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                'success': False,
                'message': 'Username already exists'
            }, status=400)
        
        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return JsonResponse({
                'success': False,
                'message': 'Email already exists'
            }, status=400)
        
        # Create new user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Automatically log in the new user
        login(request, user)
        
        return JsonResponse({
            'success': True,
            'message': 'Account created successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
        
    except json.JSONDecodeError:
        # Invalid JSON in request body
        return JsonResponse({
            'success': False,
            'message': 'Invalid JSON data'
        }, status=400)
    except Exception as e:
        # Handle any other unexpected errors
        return JsonResponse({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }, status=500)


@csrf_exempt  # Disable CSRF for API endpoint
@require_http_methods(["POST"])  # Only allow POST requests
def logout_view(request):
    """
    Handle user logout requests.
    
    This view logs out the current user and destroys their session.
    
    Returns:
    - Success: {"success": True, "message": "Logged out successfully"}
    """
    try:
        # Log out the user (destroys session)
        logout(request)
        
        return JsonResponse({
            'success': True,
            'message': 'Logged out successfully'
        })
        
    except Exception as e:
        # Handle any unexpected errors
        return JsonResponse({
            'success': False,
            'message': f'An error occurred: {str(e)}'
        }, status=500)


@require_http_methods(["GET"])  # Only allow GET requests
def check_auth_view(request):
    """
    Check if the current user is authenticated.
    
    This view checks if there's an active user session.
    
    Returns:
    - Authenticated: {"authenticated": True, "user": {...}}
    - Not authenticated: {"authenticated": False}
    """
    try:
        if request.user.is_authenticated:
            # User is logged in
            return JsonResponse({
                'authenticated': True,
                'user': {
                    'id': request.user.id,
                    'username': request.user.username,
                    'email': request.user.email
                }
            })
        else:
            # User is not logged in
            return JsonResponse({
                'authenticated': False
            })
            
    except Exception as e:
        # Handle any unexpected errors
        return JsonResponse({
            'authenticated': False,
            'message': f'An error occurred: {str(e)}'
        }, status=500)
