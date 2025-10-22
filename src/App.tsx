import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SidebarProvider } from "@/lib/sidebar-context"
import { MessageProvider } from "@/lib/message-context"
import { UserProvider } from "@/lib/user-context"
import { TaskProvider } from "@/lib/task-context"
import { LCGProvider } from "@/lib/lcg-context"
import AppShell from "@/components/layout/app-shell"
import SidebarNav from "@/components/layout/sidebar-nav"
import MainContent from "@/components/layout/main-content"
import { Toaster } from "@/components/ui/sonner"
import Home from "@/pages/home"
import ConversationDetailsPage from "@/pages/conversations/[id]"
import SearchPage from "@/pages/search"
import MacrosPage from "@/pages/macros"
import NotificationsPage from "@/pages/notification"
import SettingsPage from "@/pages/settings"
import HelpPage from "@/pages/help"
import OnboardingPage from "@/pages/onboarding"
import LoginPage from "@/pages/auth/login"
import SignupPage from "@/pages/auth/signup"
import ForgotPasswordPage from "@/pages/auth/forgot-password"

function App() {
  return (
    <Router>
      <SidebarProvider>
        <MessageProvider>
          <UserProvider>
            <TaskProvider>
              <LCGProvider>
                <AppShell>
                <div className="flex h-screen">
                  <SidebarNav />
                  <MainContent>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="/macros" element={<MacrosPage />} />
                      <Route path="/notifications" element={<NotificationsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/help" element={<HelpPage />} />
                      <Route path="/onboarding" element={<OnboardingPage />} />
                      <Route path="/conversations/:id" element={<ConversationDetailsPage />} />
                      {/* Auth routes */}
                      <Route path="/auth/login" element={<LoginPage />} />
                      <Route path="/auth/signup" element={<SignupPage />} />
                      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                    </Routes>
                  </MainContent>
                </div>
                <Toaster />
                </AppShell>
              </LCGProvider>
            </TaskProvider>
          </UserProvider>
        </MessageProvider>
      </SidebarProvider>
    </Router>
  )
}

export default App
