

import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  const { user, updatePrivacy } = useUser()

  if (!user) return null

  const handleToggle = (key: keyof typeof user.privacy) => {
    if (typeof user.privacy[key] === "boolean") {
      updatePrivacy({ [key]: !user.privacy[key] })
    }
  }

  const handleChange = (key: keyof typeof user.privacy, value: string) => {
    updatePrivacy({ [key]: value })
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Privacy Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Profile Visibility</p>
              <p className="text-sm text-foreground-secondary">Who can see your profile</p>
            </div>
            <select
              value={user.privacy.profileVisibility}
              onChange={(e) => handleChange("profileVisibility", e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Online Status</p>
              <p className="text-sm text-foreground-secondary">Show when you are online</p>
            </div>
            <button
              onClick={() => handleToggle("showOnlineStatus")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                user.privacy.showOnlineStatus ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.privacy.showOnlineStatus ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Allow Messages</p>
              <p className="text-sm text-foreground-secondary">Allow others to send you messages</p>
            </div>
            <button
              onClick={() => handleToggle("allowMessages")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                user.privacy.allowMessages ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.privacy.allowMessages ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Data Collection</p>
              <p className="text-sm text-foreground-secondary">Allow us to collect usage data</p>
            </div>
            <button
              onClick={() => handleToggle("dataCollection")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                user.privacy.dataCollection ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.privacy.dataCollection ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Share Analytics</p>
              <p className="text-sm text-foreground-secondary">Help us improve by sharing analytics</p>
            </div>
            <button
              onClick={() => handleToggle("shareAnalytics")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth ${
                user.privacy.shareAnalytics ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  user.privacy.shareAnalytics ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        <div className="space-y-3">
          <Button className="w-full bg-background hover:bg-surface-secondary text-foreground border border-border">
            Download My Data
          </Button>
          <Button className="w-full bg-background hover:bg-surface-secondary text-foreground border border-border">
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
