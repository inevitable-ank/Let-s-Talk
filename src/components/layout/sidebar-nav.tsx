
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Settings, Search, Bell, HelpCircle, Zap, LogOut, ChevronLeft, ChevronRight } from "lucide-react"
import { useSidebar } from "@/lib/sidebar-context"

const navItems = [
  { href: "/", label: "Chat", icon: MessageSquare },
  { href: "/search", label: "Search", icon: Search },
  { href: "/macros", label: "Macros", icon: Zap },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/settings", label: "Settings", icon: Settings },
]

export default function SidebarNav() {
  const pathname = usePathname()
  const { isCollapsed, toggleCollapse } = useSidebar()

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 h-screen bg-surface border-r border-border flex flex-col transition-all duration-300 z-40 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo & Collapse Button */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              LumenChat
            </h1>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg hover:bg-surface-secondary transition-colors flex-shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-foreground hover:bg-surface-secondary"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            )
          })}
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-border">
          <button
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground hover:bg-surface-secondary transition-colors ${
              isCollapsed ? "justify-center" : ""
            }`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </nav>
    </>
  )
}
