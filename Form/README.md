# Authentication System - React + Django

A beginner-friendly authentication system built with React (frontend) and Django (backend). This project includes user registration, login, logout, and session management.

## 📁 Project Structure

```
Form/
├── backend/          # Django backend server
│   ├── manage.py    # Django management script
│   ├── auth_project/    # Main Django project
│   └── authentication/ # Authentication app
└── frontend/         # React frontend
    ├── src/         # React source code
    ├── public/      # Static files
    └── package.json # Frontend dependencies
```

## 🚀 Features

- **User Registration**: Create new user accounts with username, email, and password
- **User Login**: Authenticate existing users
- **User Logout**: Securely end user sessions
- **Session Management**: Maintain user authentication state
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Clear error messages for users

## 🛠️ Prerequisites

Before running this project, make sure you have installed:

- **Python 3.8+** (for Django backend)
- **Node.js 14+** (for React frontend)
- **npm** or **yarn** (comes with Node.js)

## ⚙️ Installation & Setup

### 🎯 Quick Start (Recommended for Beginners)

For the easiest setup, use our automated startup scripts:

**For Linux/Mac users:**
```bash
cd Form
./start_servers.sh
```

**For Windows users:**
```bash
cd Form
start_servers.bat
```

These scripts will automatically:
- Create virtual environments
- Install all dependencies
- Run database migrations
- Start both backend and frontend servers

### 📋 Manual Setup (Alternative)

If you prefer to set up everything manually or the scripts don't work:

### 1. Backend Setup (Django)

1. **Navigate to the backend directory:**
   ```bash
   cd Form/backend
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Django and required packages:**
   ```bash
   pip install -r requirements.txt
   ```
   
   Or manually install individual packages:
   ```bash
   pip install django djangorestframework django-cors-headers
   ```

5. **Run database migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create a superuser** (optional, for admin access):
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the Django server:**
   ```bash
   python manage.py runserver
   ```
   
   The backend will be running at `http://localhost:8000`

### 2. Frontend Setup (React)

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd Form/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```
   
   The frontend will be running at `http://localhost:3000`

## 🖥️ Usage

1. **Access the application** by opening your browser and going to `http://localhost:3000`

2. **Register a new account:**
   - Click on "Sign Up" tab
   - Fill in your username, email, and password
   - Confirm your password
   - Click "Sign Up"

3. **Login to your account:**
   - Click on "Login" tab
   - Enter your username and password
   - Click "Login"

4. **After successful login:**
   - You'll see a welcome dashboard
   - You can logout by clicking the "Logout" button

## 📝 Code Structure Explanation

### Frontend (React)

- **`src/App.js`**: Main application component that handles:
  - Authentication state management
  - Form switching (login/signup)
  - User session checking
  - Component rendering based on authentication state

- **`src/services/authService.js`**: Service functions for:
  - API calls to Django backend
  - Login, signup, logout functions
  - Authentication status checking

- **`src/App.css`**: Styling for:
  - Form layouts and design
  - Responsive design
  - Animations and transitions

### Backend (Django)

- **`authentication/views.py`**: Contains view functions for:
  - User login authentication
  - User registration
  - User logout
  - Authentication status checking

- **`authentication/urls.py`**: URL routing for:
  - API endpoints definition
  - Mapping URLs to view functions

## 🔧 API Endpoints

The Django backend provides these API endpoints:

- **POST** `/api/auth/login/` - User login
- **POST** `/api/auth/signup/` - User registration
- **POST** `/api/auth/logout/` - User logout
- **GET** `/api/auth/check/` - Check authentication status

## 🎨 Customization

### Changing Styles

To customize the appearance:

1. Open `Form/frontend/src/App.css`
2. Modify colors, fonts, or layouts
3. The CSS is organized with comments explaining each section

### Adding Features

To add new features:

1. **Backend**: Add new views in `authentication/views.py`
2. **Frontend**: Add new components in `src/App.js`
3. **API**: Add new endpoints in `authentication/urls.py`

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure django-cors-headers is installed and configured
2. **Database Issues**: Run `python manage.py migrate` if you see database errors
3. **Port Conflicts**: Change ports in settings if default ports are in use
4. **Module Not Found**: Make sure virtual environment is activated for Django

### Debug Mode

- Django runs in debug mode by default
- React development server provides hot reloading
- Check browser console for frontend errors
- Check terminal for backend errors

## 📚 Learning Resources

For beginners who want to learn more:

- **React**: [React Official Documentation](https://reactjs.org/docs/getting-started.html)
- **Django**: [Django Official Tutorial](https://docs.djangoproject.com/en/stable/intro/tutorial01/)
- **JavaScript**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Python**: [Python Official Tutorial](https://docs.python.org/3/tutorial/)

## 🤝 Contributing

This is a learning project. Feel free to:

- Add new features
- Improve the UI/UX
- Fix bugs
- Add more comments for clarity

## 📄 License

This project is created for educational purposes. Feel free to use and modify it for learning.

---

**Happy Coding! 🚀**

If you encounter any issues or have questions, don't hesitate to ask for help!