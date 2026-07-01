import { useState } from 'react'
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import { Routes,Route } from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import Register from './pages/auth/Register'
import Layout from './components/Layout.tsx'
import { SubjectProvider } from './context/SubjectContext.tsx'
import SubjectPage from './pages/SubjectPage.tsx'

// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
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

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App
