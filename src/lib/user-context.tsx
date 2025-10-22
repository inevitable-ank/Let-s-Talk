"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  role: "user" | "admin" | "moderator"
  createdAt: string
  preferences: UserPreferences
  privacy: PrivacySettings
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  notifications: boolean
  emailDigest: boolean
  autoExtractTasks: boolean
  language: string
}

export interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends"
  showOnlineStatus: boolean
  allowMessages: boolean
  dataCollection: boolean
  shareAnalytics: boolean
}

interface UserContextType {
  user: UserProfile | null
  setUser: (user: UserProfile) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  updatePrivacy: (privacy: Partial<PrivacySettings>) => void
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const MOCK_USER: UserProfile = {
  id: "user-1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  bio: "Product manager passionate about AI and collaboration tools",
  role: "user",
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  preferences: {
    theme: "system",
    notifications: true,
    emailDigest: true,
    autoExtractTasks: true,
    language: "en",
  },
  privacy: {
    profileVisibility: "public",
    showOnlineStatus: true,
    allowMessages: true,
    dataCollection: true,
    shareAnalytics: false,
  },
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(MOCK_USER)

  const setUser = useCallback((newUser: UserProfile) => {
    setUserState(newUser)
  }, [])

  const updatePreferences = useCallback((preferences: Partial<UserPreferences>) => {
    setUserState((prev) =>
      prev
        ? {
            ...prev,
            preferences: { ...prev.preferences, ...preferences },
          }
        : null,
    )
  }, [])

  const updatePrivacy = useCallback((privacy: Partial<PrivacySettings>) => {
    setUserState((prev) =>
      prev
        ? {
            ...prev,
            privacy: { ...prev.privacy, ...privacy },
          }
        : null,
    )
  }, [])

  const logout = useCallback(() => {
    setUserState(null)
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, updatePreferences, updatePrivacy, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
