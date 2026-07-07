# 🚀 Revly

<p align="center">
  <img src="./frontend/public/logo.png" alt="Revly Logo" width="120"/>
</p>

<p align="center">
  <strong>AI-powered platform that transforms lecture images into structured revision notes.</strong>
</p>

<p align="center">
  <a href="https://revly-notes.vercel.app"><strong>🌐 Live Demo</strong></a>
  •
  <a href="#features"><strong>✨ Features</strong></a>
  •
  <a href="#installation"><strong>⚡ Installation</strong></a>
</p>

---

## 📖 About

Revly is an AI-powered study platform that helps students convert lecture images into organized, revision-ready notes.

Instead of manually typing classroom notes, students simply upload lecture images and Revly automatically extracts the content, organizes it into subjects, generates clean markdown notes using AI, and stores everything securely for future revision.

The project focuses on making studying faster, more organized, and more efficient.

---

# ✨ Features

### 🤖 AI Powered

* AI-generated structured notes
* Automatic note formatting
* AI summaries
* Markdown output

### 📸 Smart Upload

* Upload lecture images
* Cloudinary image storage
* OCR text extraction
* Fast processing

### 📚 Organization

* Subject management
* Organized notes
* Search functionality
* Recent activity

### 🔐 Authentication

* Email & Password Login
* Google Sign In
* Forgot Password
* Password Reset via Email
* JWT Authentication
* Secure HTTP-only Cookies

### ☁️ Cloud Services

* MongoDB Atlas
* Cloudinary
* Brevo Email
* Render Deployment
* Vercel Frontend

### 🎨 User Experience

* Modern UI
* Dark Mode
* Responsive Design
* Beautiful animations
* Loading states
* Toast notifications

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router
* TanStack Query
* Lucide Icons

---

## Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* JWT Authentication
* Google OAuth
* Brevo Email API
* Cloudinary
* BullMQ
* Redis

---

## AI

* Google Gemini
* OCR Processing
* Markdown Generation

---

# 📸 Screenshots

## Landing Page

> Add screenshot here

```
screenshots/
    landing.png
```

---

## Dashboard

> Add screenshot here

```
screenshots/
    dashboard.png
```

---

## AI Generated Notes

> Add screenshot here

```
screenshots/
    notes.png
```

---

## Upload Page

> Add screenshot here

```
screenshots/
    upload.png
```

---

## Profile

> Add screenshot here

```
screenshots/
    profile.png
```

---

# 🏗 Architecture

```
                   React Frontend
                         │
                         │
                  Express Backend
                         │
        ┌────────────────┴───────────────┐
        │                                │
 Authentication                     AI Services
        │                                │
 Google OAuth                  Google Gemini
 Email Login                         OCR
 JWT Cookies                         │
        │                             │
        └──────────────┬──────────────┘
                       │
                  MongoDB Atlas
                       │
                 Cloudinary Images
                       │
                Redis + BullMQ Queue
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/xVeeKay/revly.git
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# ⚙ Environment Variables

## Backend (.env)

```env
PORT=

MONGO_URL=

JWT_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=

BREVO_API_KEY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

REDIS_URL=

GEMINI_API_KEY=

FRONTEND_URL=
```

---

## Frontend (.env)

```env
VITE_API_URL=

VITE_GOOGLE_CLIENT_ID=
```

---

# 📂 Project Structure

```
Revly

├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   ├── context
│   ├── api
│   └── assets
│
├── backend
│   ├── api
│   │   ├── controllers
│   │   ├── middlewares
│   │   └── routes
│   │
│   ├── models
│   ├── workers
│   ├── utils
│   ├── config
│   └── templates
│
└── screenshots
```

---

# 🔐 Authentication Flow

## Email Login

```
Register

↓

Password Hashing

↓

JWT Cookie

↓

Authenticated User
```

---

## Google Login

```
Google OAuth

↓

Google Verification

↓

User Created (if needed)

↓

JWT Cookie

↓

Dashboard
```

---

## Forgot Password

```
Forgot Password

↓

Generate Secure Token

↓

SHA-256 Hash

↓

Save Hash

↓

Email Link

↓

Reset Password
```

---

# 📡 API Endpoints

## Authentication

```
POST    /auth/register

POST    /auth/login

POST    /auth/google

POST    /auth/logout

GET     /auth/me

PATCH   /auth/profile

PATCH   /auth/password

POST    /auth/forgot-password

POST    /auth/reset-password/:token

DELETE  /auth/delete-account
```

---

## Subjects

```
GET

POST

PATCH

DELETE
```

---

## Notes

```
GET

POST

PATCH

DELETE
```

---

# 🚀 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |
| Images   | Cloudinary    |
| AI       | Gemini        |
| Queue    | BullMQ        |
| Redis    | Upstash       |
| Email    | Brevo         |

---

# 🔒 Security

* Passwords hashed using bcrypt
* JWT Authentication
* HTTP-only Cookies
* Secure Cookies
* Google OAuth
* SHA-256 Password Reset Tokens
* Protected Routes
* Input Validation
* Secure Email Verification

---

# 📈 Future Roadmap

* [x] Email Authentication
* [x] Google Authentication
* [x] Forgot Password
* [x] AI Note Generation
* [x] Markdown Notes
* [x] Cloudinary Upload
* [x] Dark Mode
* [x] Responsive Design
* [ ] AI Quiz Generation
* [ ] Flashcards
* [ ] PDF Export
* [ ] Note Sharing
* [ ] Mobile Application
* [ ] Study Analytics
* [ ] AI Chat with Notes
* [ ] Voice Notes

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Vishal Kumar**

Computer Science Engineering Student

GitHub: https://github.com/xVeeKay


---

<p align="center">
Made with ❤️ by Vishal Kumar
</p>
