import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import posthog from "@/lib/posthog.ts"
import App from './App.tsx'
import AuthProvider from './context/AuthContext.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { Toaster } from 'sonner'
import {GoogleOAuthProvider} from "@react-oauth/google"
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <App />
            </GoogleOAuthProvider>
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);