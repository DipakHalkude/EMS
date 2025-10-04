# Employee Management System (EMS)

A comprehensive full-stack web application for managing employees, departments, leaves, and salaries in an organization. Built with React frontend and Node.js/Express backend with MongoDB database.

## 🚀 Features

### Admin Features
- **Dashboard**: Overview of employees, departments, and leave statistics
- **Employee Management**: Add, edit, view, and manage employee profiles
- **Department Management**: Create and manage organizational departments
- **Leave Management**: Approve/reject employee leave requests
- **Salary Management**: Add and view employee salary information
- **Settings**: System configuration and user management

### Employee Features
- **Personal Dashboard**: View personal information and statistics
- **Profile Management**: View and update personal profile
- **Leave Management**: Apply for leaves and track leave history
- **Salary View**: View salary information and history
- **Settings**: Update personal settings and preferences

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI framework
- **React Router DOM 7.9.3** - Client-side routing
- **Tailwind CSS 3.4.17** - Styling framework
- **Axios 1.12.2** - HTTP client
- **Framer Motion 12.23.22** - Animation library
- **React Data Table Component 7.7.0** - Data tables
- **Lucide React 0.544.0** - Icon library
- **Vite** - Build tool and development server

### Backend
- **Node.js** - Runtime environment
- **Express.js 5.1.0** - Web framework
- **MongoDB** - Database
- **Mongoose 8.18.2** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcrypt 6.0.0** - Password hashing
- **Multer 2.0.2** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/EMS.git
cd EMS
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Note**: `package-lock.json` files and `node_modules` are not included in the repository. They will be automatically generated when you run `npm install`.

### 3. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ems
JWT_KEY=your_jwt_secret_key_here
```

**Note**: Replace `your_jwt_secret_key_here` with a strong, random secret key for JWT token signing.

### 4. Database Setup

```bash
# Start MongoDB service (if running locally)
# For Windows:
net start MongoDB

# For macOS/Linux:
sudo systemctl start mongod

# Seed initial admin user
node userSeed.js
```

### 5. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

**Note**: `package-lock.json` files and `node_modules` are not included in the repository. They will be automatically generated when you run `npm install`.

### 6. Start the Application

#### Start Backend Server
```bash
# From server directory
npm start
```

#### Start Frontend Development Server
```bash
# From frontend directory
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔐 Default Login Credentials

The system comes with a pre-configured admin account:

- **Email**: admin@gmail.com
- **Password**: Admin@108

**Important**: Change these credentials after first login for security purposes.

## 🧪 Running Tests

Currently, the project doesn't include automated test cases. However, you can test the application manually:

### Manual Testing Checklist

1. **Authentication**
   - [ ] Login with admin credentials
   - [ ] Logout functionality
   - [ ] Protected route access

2. **Employee Management**
   - [ ] Add new employee
   - [ ] Edit employee details
   - [ ] View employee profile
   - [ ] Delete employee

3. **Department Management**
   - [ ] Create new department
   - [ ] Edit department details
   - [ ] View department list

4. **Leave Management**
   - [ ] Apply for leave (employee)
   - [ ] Approve/reject leave (admin)
   - [ ] View leave history

5. **Salary Management**
   - [ ] Add salary information
   - [ ] View salary details

## 📁 Project Structure

```
EMS/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── dashboard/    # Dashboard components
│   │   │   ├── department/   # Department management
│   │   │   ├── employee/     # Employee management
│   │   │   ├── leave/        # Leave management
│   │   │   └── salary/       # Salary management
│   │   ├── pages/           # Main application pages
│   │   ├── context/         # React context providers
│   │   └── utils/           # Utility functions and helpers
│   ├── package.json
│   └── vite.config.js
├── server/                  # Node.js backend application
│   ├── controllers/         # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── db/                 # Database configuration
│   ├── public/uploads/     # File uploads directory
│   ├── package.json
│   └── index.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Employee Management
- `GET /api/employee` - Get all employees
- `POST /api/employee` - Create new employee
- `GET /api/employee/:id` - Get employee by ID
- `PUT /api/employee/:id` - Update employee
- `DELETE /api/employee/:id` - Delete employee

### Department Management
- `GET /api/department` - Get all departments
- `POST /api/department` - Create new department
- `PUT /api/department/:id` - Update department
- `DELETE /api/department/:id` - Delete department

### Leave Management
- `GET /api/leave` - Get all leave requests
- `POST /api/leave` - Create leave request
- `PUT /api/leave/:id` - Update leave status
- `GET /api/leave/:id` - Get leave details

### Salary Management
- `GET /api/salary` - Get salary information
- `POST /api/salary` - Add salary record
- `GET /api/salary/:id` - Get salary by employee ID

## 🎨 Design Choices & Assumptions

### Frontend Architecture
- **Component-based architecture**: Modular components for better maintainability
- **Context API**: Used for global state management (authentication)
- **Protected Routes**: Role-based access control for admin and employee sections
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Modern React**: Uses React 19 with hooks and functional components

### Backend Architecture
- **RESTful API**: Standard HTTP methods for CRUD operations
- **MVC Pattern**: Separation of concerns with controllers, models, and routes
- **JWT Authentication**: Stateless authentication with JSON Web Tokens
- **Middleware**: Custom middleware for authentication and error handling
- **File Upload**: Multer for handling profile image uploads

### Database Design
- **MongoDB**: NoSQL database for flexible schema design
- **Mongoose ODM**: Object modeling for MongoDB
- **Referenced Documents**: Employee references User and Department models
- **Timestamps**: Automatic createdAt and updatedAt fields

### Security Considerations
- **Password Hashing**: bcrypt for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: Restricted file types and sizes

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku/Railway)
```bash
cd server
# Add production environment variables
# Deploy the server directory
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_uri
JWT_KEY=your_production_jwt_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please:
 Email: dipakdh12345@gmail.com

## 🔄 Future Enhancements

- [ ] Email notifications for leave approvals
- [ ] Advanced reporting and analytics
- [ ] Employee performance tracking
- [ ] Integration with HR systems
- [ ] Mobile application
- [ ] Advanced search and filtering
- [ ] Bulk operations for employee management
- [ ] Automated backup system

---

**Note**: This is a development version of the Employee Management System. For production use, ensure proper security measures, environment configuration, and regular backups are in place.
