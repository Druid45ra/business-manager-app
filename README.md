# business-manager-app

**# Business Manager App: MERN Stack Multi-Location System

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/Node.js-20.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248)](https://www.mongodb.com/atlas)

This is a robust, full-stack application designed for managing inventory, user roles, and operational data across multiple physical business locations. The system enforces **location-based authorization** and **role-based access control (RBAC)** to ensure data security and integrity.

## 🚀 Key Features

* **Role-Based Access Control (RBAC):** Users are assigned roles (`admin`, `manager`, `employee`) with specific permissions.
* **Location Restriction:** All data access (viewing inventory, adding products) is restricted to the user's assigned location (e.g., "Bucuresti", "Cluj").
* **Authentication:** Secure user registration and login using **JWT** (JSON Web Tokens) and **Bcrypt** for password hashing.
* **Inventory Management:** CRUD operations for products, automatically linked to the user's location.
* **MERN Stack:** Utilizes **MongoDB**, **Express**, **React**, and **Node.js**.

## 💻 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Backend (API)** | Node.js, Express, Mongoose | RESTful API built with Express, handles authentication, authorization, and database interaction. |
| **Database** | MongoDB Atlas | Cloud-hosted NoSQL database for flexible data storage. |
| **Authentication** | JWT, BcryptJS | Tokens for session management, hashing for password security. |
| **Frontend (UI)** | React, React Router | Single Page Application (SPA) for a responsive user experience. |

## 🛠️ Installation and Setup

### 1. Prerequisites

You must have **Node.js** (version 18+) and **npm** installed globally on your machine.

### 2. Clone the Repository

```bash
git clone [https://github.c**om/Druid45ra/business-manager-app.git](https://github.com/Druid45ra/business-manager-app.git)
cd business-manager-app

### 3.Backend Setup

Navigate to the backend directory and install dependencies.
Bash

cd backend
npm install

Environment Variables

Create a file named .env in the /backend directory and add your configuration variables:

# .env file for backend

PORT=5000

# Get your connection string from MongoDB Atlas and replace placeholders
MONGODB_URI=mongodb+srv://<dbUser>:<dbPassword>@<clusterName>.mongodb.net/businessDB?retryWrites=true&w=majority

# MUST be a long, complex, random string
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development

4. Frontend Setup

Navigate to the frontend directory and install dependencies.
Bash

cd ../frontend
npm install

Environment Variables

Create a file named .env.local in the /frontend directory:

# .env.local file for frontend

# Ensure the port matches your backend port (default: 5000)
REACT_APP_API_URL=http://localhost:5000/api

▶️ Running the Application

You need to start the Backend server and the Frontend development server in separate terminal windows.

1. Start the Backend API

From the /backend directory:
Bash

npm run dev

The server will run on http://localhost:5000.

2. Start the Frontend App

From the /frontend directory:
Bash

npm start

The React app will open in your browser (usually http://localhost:3000).

🔑 Initial User Roles (for testing)

For initial testing, you can use the Register page to create users with different roles and locations to verify the access control logic:
Role	Permissions	Location
admin	Full access. Can view/edit all data (in a full implementation) and manage users.	Any location (e.g., Bucuresti)
manager	Inventory management (CRUD) and viewing, restricted to their assigned location.	Any location (e.g., Cluj)
employee	Viewing inventory, restricted to their assigned location.	Any location (e.g., Timisoara)

📜 Project Structure Overview

/business-manager-app
├── /backend
│   ├── /controllers
│   ├── /middleware
│   ├── /models
│   ├── /routes
│   ├── .env
│   └── server.js
└── /frontend
    ├── /src
    │   ├── /components
    │   ├── /context
    │   ├── /pages
    │   └── /services
    └── package.json
