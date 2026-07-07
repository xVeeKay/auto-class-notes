# 🚀 Revly

<p align="center">
  <img src="./frontend/public/logo.png" alt="Revly Logo" width="120"/>
</p>

<p align="center">
  <strong>Never lose your lecture notes again.</strong>
</p>

<p align="center">
Revly automatically transforms your classroom photos into organized, revision-ready notes while you focus on learning.
</p>

<p align="center">
  <a href="https://revly-notes.vercel.app"><strong>🌐 Live Demo</strong></a>
</p>

---

# 📖 Why Revly?

Every student has hundreds of lecture photos sitting in their phone gallery.

During class, taking a picture is quick and convenient. But when exams arrive, those photos become difficult to search, impossible to revise from, and often end up forgotten.

As a result, students spend hours looking for notes or borrowing them from friends—even though they already captured everything in class.

Revly solves this problem **without changing the student's existing habit.**

Keep taking lecture photos exactly as you always do.

Simply upload them to Revly, and the platform automatically processes them in the background using AI to create clean, structured, subject-wise revision notes—without writing prompts, copying text, or manually organizing anything.

Instead of ending the semester with a gallery full of forgotten images, you'll have a complete collection of organized notes ready whenever exams begin.

---

# ✨ Features

## 📸 Upload Like You Always Do

- Upload classroom lecture images
- No prompts to write
- No manual typing
- No copying text
- Same effort as taking lecture photos

---

## 🤖 AI Works Automatically

- Background AI processing
- Intelligent note generation
- Clean markdown formatting
- AI-generated summaries
- Structured revision notes

---

## 📚 Stay Organized

- Automatic subject organization
- Search notes instantly
- Beautiful dashboard
- Track uploaded notes
- Access everything from one place

---

## ⚡ Built for Exam Season

Instead of scrolling through hundreds of gallery photos,

Revly gives you:

- Complete revision notes
- Organized subjects
- Searchable content
- Ready-to-study material

when you actually need it.

---

## 🔐 Secure Authentication

- Email & Password Login
- Google Sign In
- Forgot Password
- Secure Password Reset
- JWT Authentication
- HTTP-only Cookies

---

## ☁️ Cloud Infrastructure

- Cloudinary Image Storage
- MongoDB Atlas
- Redis Queue
- BullMQ Background Processing
- Brevo Email Service
- Google Gemini AI

---

# 🎯 The Revly Workflow

Lecture

↓

📸 Take Photo

↓

Upload to Revly

↓

Background AI Processing

↓

Automatic Note Generation

↓

Subject Organization

↓

Revision-ready Notes

↓

Exam Time 🎉

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
git clone https://github.com/xVeeKay/auto-class-notes.git
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
