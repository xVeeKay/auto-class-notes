import { useState } from 'react'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import { Routes,Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import Register from './pages/auth/Register'
import Layout from './components/Layout.tsx'
import { SubjectProvider } from './context/SubjectContext.tsx'
import SubjectPage from './pages/SubjectPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import FeedbackPage from './pages/FeedbackPage.tsx'
import SupportPage from './pages/SupportPage.tsx'
import ForgotPassword from './pages/auth/ForgotPassword.tsx'
import ResetPassword from './pages/auth/ResetPassword.tsx'

// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route
        element={
          <SubjectProvider>
            <Layout />
          </SubjectProvider>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/:subjectId"
          element={
            <ProtectedRoutes>
              <SubjectPage />
            </ProtectedRoutes>
          }
        />
      </Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoutes>
            <FeedbackPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoutes>
            <SupportPage />
          </ProtectedRoutes>
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App
