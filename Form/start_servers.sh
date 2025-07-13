#!/bin/bash

# Authentication System Startup Script
# This script helps you start both the Django backend and React frontend servers

echo "🚀 Starting Authentication System..."
echo "=================================="

# Check if we're in the correct directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the Form directory"
    echo "   Make sure you're in the directory that contains 'backend' and 'frontend' folders"
    exit 1
fi

# Function to check if a command exists
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ Error: $1 is not installed"
        echo "   Please install $1 and try again"
        exit 1
    fi
}

# Check if Python is installed
check_command python3
check_command node
check_command npm

echo "✅ All required tools are installed"
echo ""

# Start Django backend in background
echo "🔧 Starting Django Backend..."
echo "------------------------------"
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "📥 Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Start Django server in background
echo "🚀 Starting Django server on http://localhost:8000..."
python manage.py runserver &
DJANGO_PID=$!

# Go back to main directory
cd ..

# Start React frontend
echo ""
echo "⚛️  Starting React Frontend..."
echo "------------------------------"
cd frontend

# Install npm dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Start React development server
echo "🚀 Starting React server on http://localhost:3000..."
npm start &
REACT_PID=$!

# Go back to main directory
cd ..

echo ""
echo "🎉 Both servers are starting!"
echo "=================================="
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:8000"
echo "🔧 Admin:    http://localhost:8000/admin"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for user to press Ctrl+C
trap 'echo ""; echo "🛑 Stopping servers..."; kill $DJANGO_PID $REACT_PID; exit 0' INT
wait