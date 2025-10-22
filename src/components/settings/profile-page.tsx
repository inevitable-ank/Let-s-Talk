

import { Camera, Mail, Calendar } from "lucide-react"
import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const { user, setUser } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  })

  if (!user) return null

  const handleSave = () => {
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      bio: formData.bio,
    })
    setIsEditing(false)
  }

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  return (
    <div className="max-w-2xl">
      <div className="bg-surface border border-border rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Profile</h2>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className={`${isEditing ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary-dark"} text-white`}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="relative">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-primary"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-smooth">
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
                <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary-dark text-white">
                  Save Changes
                </Button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
                <div className="flex items-center gap-2 text-foreground-secondary mt-1">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-foreground-secondary mt-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Member since {memberSince}</span>
                </div>
                {user.bio && <p className="text-foreground-secondary mt-3">{user.bio}</p>}
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-foreground-secondary uppercase">Role</p>
              <p className="text-sm font-medium text-foreground mt-1 capitalize">{user.role}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground-secondary uppercase">User ID</p>
              <p className="text-sm font-mono text-foreground-secondary mt-1">{user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
