import { useSidebar } from "@/lib/sidebar-context"
import type React from "react"

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
      {children}
    </div>
  )
}
