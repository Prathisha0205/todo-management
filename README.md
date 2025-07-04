# 📝 Todo Task Management Web Application

A full-stack, responsive, and real-time Todo Task Manager built with **React.js**, **Node.js**, and **MongoDB Atlas**, integrated with **Firebase Authentication** (Google OAuth). This project enables users to manage personal and shared tasks efficiently with features like task CRUD, filters, sharing, real-time updates, and a clean user experience.

---

## 🎯 Objective

The goal is to demonstrate complete engineering capability—from secure authentication, API development, and real-time features to responsive UI and cloud deployment—within the scope of the **Katomaran Full Stack Hackathon 2025**.

---

## 🚀 Features

* 🔐 **Social Login** via Google (OAuth 2.0)
* 🧑‍💻 User Profile with editable name & age
* ✅ Full CRUD on tasks (Create, Read, Update, Delete)
* 🔁 Real-time task updates using WebSockets
* 📬 Share tasks with other users via email or username
* 🔍 Filter tasks:

  * All
  * Incomplete
  * Completed
  * Due Today
  * Overdue
  * By Priority
* 🏷️ Priority-based tags with color indicators
* 📅 Due date and time picker
* 🌗 Dark/Light mode (persisted in localStorage)
* 🔔 Toast notifications for all user actions
* 📱 Fully responsive (mobile + desktop)
* 💾 Offline access support via localStorage caching

---

## 🧱 Tech Stack

| Layer         | Technology                          |
| ------------- | ----------------------------------- |
| **Frontend**  | React.js, Bootstrap 5, React Router |
| **Backend**   | Node.js, Express.js                 |
| **Database**  | MongoDB Atlas                       |
| **Auth**      | Firebase Authentication (Google)    |
| **Real-time** | Socket.io (WebSockets)              |
| **Deploy**    | Frontend: Vercel<br>Backend: Render |

---

## 📁 Folder Structure

```
todo-task-manager/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── App.jsx
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── screenshots/
│   ├── Screenshot-dark-editable.png
│   ├── Screenshot-dark-saved.png
│   └── architecture.png
├── README.md
├── package.json
└── .env
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Prathisha0205/todo-task-manager.git
cd todo-task-manager
```

### 2. Environment Setup

Create a `.env` file for the server with:

```env
MONGO_URI=your_mongo_connection_string
PORT=5000
FIREBASE_API_KEY=your_firebase_key
```

Update `firebase-config.js` in `client/src` with your Firebase credentials.

---

### 3. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

---

### 4. Run the App

```bash
# Backend
cd server
npm start

# Frontend (in a new terminal)
cd client
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🖼️ Screenshots

| Editable Profile                                | Saved Profile                                |
| ----------------------------------------------- | -------------------------------------------- |
| ![](./screenshots/Screenshot-dark-editable.png) | ![](./screenshots/Screenshot-dark-saved.png) |

---

## 🧠 Architecture Diagram

![](./screenshots/architecture.png)

---

## 🎥 Demo Video

Watch the demo walkthrough on Loom:
📽 [Click to Watch](https://www.loom.com/share/64918b6a0e43409ab15e770bdd754568?sid=b68c1aa1-0763-4427-b0f5-a294624d4397).

---

## 📌 Assumptions

* Only Google OAuth login is implemented due to time constraints.
* Shared task functionality is simulated through UI, but not via backend validation.
* Real-time updates are achieved via WebSocket only for assigned users.
* Tasks are persisted in MongoDB and mirrored in localStorage for offline support.

---

## ✅ Deployment Links

* 🔗 **Live App**: [https://todo-task.vercel.app](https://todo-task.vercel.app)
* 🔗 **Backend API**: [https://todo-task-api.onrender.com](https://todo-task-api.onrender.com)

---

## 🙌 Acknowledgments

* [Firebase](https://firebase.google.com/)
* [React](https://reactjs.org/)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Bootstrap](https://getbootstrap.com/)
* [Socket.IO](https://socket.io/)

---

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

---

## 🔖 Note

This project is a part of a hackathon run by [https://www.katomaran.com](https://www.katomaran.com)

---
