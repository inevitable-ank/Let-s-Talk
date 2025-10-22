import { useSidebar } from "@/lib/sidebar-context"
import { MessageProvider } from "@/lib/message-context"
import { LCGProvider } from "@/lib/lcg-context"
import { TaskProvider } from "@/lib/task-context"
import { UserProvider } from "@/lib/user-context"
import type React from "react"

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
      <UserProvider>
        <LCGProvider>
          <TaskProvider>
            <MessageProvider>{children}</MessageProvider>
          </TaskProvider>
        </LCGProvider>
      </UserProvider>
    </div>
  )
}
