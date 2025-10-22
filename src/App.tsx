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
                      <Route path="/conversations/:id" element={<ConversationDetailsPage />} />
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
