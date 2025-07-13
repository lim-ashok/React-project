@echo off
REM Authentication System Startup Script for Windows
REM This script helps you start both the Django backend and React frontend servers

echo 🚀 Starting Authentication System...
echo ==================================

REM Check if we're in the correct directory
if not exist "backend" (
    echo ❌ Error: Please run this script from the Form directory
    echo    Make sure you're in the directory that contains 'backend' and 'frontend' folders
    pause
    exit /b 1
)

if not exist "frontend" (
    echo ❌ Error: Please run this script from the Form directory
    echo    Make sure you're in the directory that contains 'backend' and 'frontend' folders
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Python is not installed
    echo    Please install Python and try again
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js is not installed
    echo    Please install Node.js and try again
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: npm is not installed
    echo    Please install npm and try again
    pause
    exit /b 1
)

echo ✅ All required tools are installed
echo.

REM Start Django backend
echo 🔧 Starting Django Backend...
echo ------------------------------
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements if requirements.txt exists
if exist "requirements.txt" (
    echo 📥 Installing Python dependencies...
    pip install -r requirements.txt
)

REM Run migrations
echo 🗄️  Running database migrations...
python manage.py makemigrations
python manage.py migrate

REM Start Django server in new window
echo 🚀 Starting Django server on http://localhost:8000...
start "Django Backend" cmd /k "call venv\Scripts\activate.bat && python manage.py runserver"

REM Go back to main directory
cd ..

REM Start React frontend
echo.
echo ⚛️  Starting React Frontend...
echo ------------------------------
cd frontend

REM Install npm dependencies
echo 📥 Installing Node.js dependencies...
npm install

REM Start React development server in new window
echo 🚀 Starting React server on http://localhost:3000...
start "React Frontend" cmd /k "npm start"

REM Go back to main directory
cd ..

echo.
echo 🎉 Both servers are starting!
echo ==================================
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:8000
echo 🔧 Admin:    http://localhost:8000/admin
echo.
echo Both servers are running in separate windows.
echo Close the terminal windows to stop the servers.
echo.
pause