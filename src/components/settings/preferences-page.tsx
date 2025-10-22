"use client"

import { useUser } from "@/lib/user-context"

export default function PreferencesPage() {
  const { user, updatePreferences } = useUser()

  if (!user) return null

  const handleToggle = (key: keyof typeof user.preferences) => {
    if (typeof user.preferences[key] === "boolean") {
      updatePreferences({ [key]: !user.preferences[key] })
    }
  }

  const handleChange = (key: keyof typeof user.preferences, value: string) => {
    updatePreferences({ [key]: value })
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Preferences</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Theme</p>
              <p className="text-sm text-foreground-secondary">Choose your preferred color scheme</p>
            </div>
            <select
              value={user.preferences.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Language</p>
              <p className="text-sm text-foreground-secondary">Select your preferred language</p>
            </div>
            <select
              value={user.preferences.language}
              onChange={(e) => handleChange("language", e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Notifications</p>
              <p className="text-sm text-foreground-secondary">Receive in-app notifications</p>
            </div>
            <button
              onClick={() => handleToggle("notifications")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                user.preferences.notifications ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.preferences.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Email Digest</p>
              <p className="text-sm text-foreground-secondary">Receive weekly email summaries</p>
            </div>
            <button
              onClick={() => handleToggle("emailDigest")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                user.preferences.emailDigest ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.preferences.emailDigest ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Auto-Extract Tasks</p>
              <p className="text-sm text-foreground-secondary">Automatically extract tasks from messages</p>
            </div>
            <button
              onClick={() => handleToggle("autoExtractTasks")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                user.preferences.autoExtractTasks ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.preferences.autoExtractTasks ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
