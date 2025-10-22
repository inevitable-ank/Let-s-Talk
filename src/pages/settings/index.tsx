
import { useState } from "react"
import { User, Settings, Lock, LogOut } from "lucide-react"
import AppShell from "@/components/layout/app-shell"
import ProfilePage from "@/components/settings/profile-page"
import PreferencesPage from "@/components/settings/preferences-page"
import PrivacyPage from "@/components/settings/privacy-page"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"

type SettingsTab = "profile" | "preferences" | "privacy"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const { logout } = useUser()

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "preferences" as const, label: "Preferences", icon: Settings },
    { id: "privacy" as const, label: "Privacy", icon: Lock },
  ]

  return (
    <AppShell>
      <div className="flex h-screen bg-background">
        <div className="w-64 bg-surface border-r border-border flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-foreground">Settings</h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    activeTab === tab.id ? "bg-primary text-white" : "text-foreground hover:bg-surface-secondary"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-destructive hover:bg-destructive/90 text-white rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "profile" && <ProfilePage />}
          {activeTab === "preferences" && <PreferencesPage />}
          {activeTab === "privacy" && <PrivacyPage />}
        </div>
      </div>
    </AppShell>
  )
}
