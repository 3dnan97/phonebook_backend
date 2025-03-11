# 📞 Phonebook Full-Stack App

This is a **full-stack** phonebook application built with **Node.js**, **Express**, **MongoDB**, and a **React frontend**.  
The backend provides RESTful API endpoints for managing contacts, while the frontend (inside the `dist` folder) interacts with the API.

🚀 **Live Demo**: [Phonebook App](https://phonebook-backend-95se.onrender.com/) *(Note: It may take up to a minute to load due to free hosting on Render.)*

---

## 📌 Features

- ✅ Add new contacts (name & number)
- ✅ Retrieve all saved contacts
- ✅ Update an existing contact’s number
- ✅ Delete contacts
- ✅ Prevents duplicate names in the database
- ✅ Full-stack setup with backend and a pre-built frontend

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/3dnan97/phonebook_backend.git
cd phonebook_backend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env file in the root directory and add your MongoDB connection string:

```sh
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```

### 4️⃣ Start the Server

```sh
npm run dev
```

The server will run at http://localhost:3001.

---

## 🔌 API Endpoints

| Method    | Endpoint | Description |
| :---------- | :----------- | :----------- |
| GET    | /api/persons | Get all contacts |
| GET    | /api/persons/:id | 	Get a specific contact |
| GET    | /info | Display the number of people stored in the database |
| POST    | /api/persons | Add a new contact |
| PUT    | /api/persons/:id | 	Update an existing contact |
| DELETE    | /api/persons/:id  | 	Remove a contact |

---

## 📁 Project Structure
```sh
phonebook_backend/
│── dist/                  # Pre-built static React frontend
│── models/                # Mongoose schemas for contacts
│── .gitignore             # Git ignore configuration
│── README.md              # Project documentation
│── api_tests.rest         # API test configuration (using Postman or REST Client)
│── eslint.config.mjs      # ESLint configuration file
│── index.js               # Main server file
│── package-lock.json      # NPM lock file
│── package.json           # NPM dependencies & scripts
```

---

## ⚙️ Technologies Used
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React.js (Pre-built inside dist/)
- ESLint: Code formatting & linting
- Render: Deployment

---

## 🔥 Deployment
This app is deployed on [Render](https://render.com/).
Due to free-tier limitations, the app may take up to 1 minute to load after a period of inactivity.
