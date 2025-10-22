

import { useEffect, useState } from "react"
import { useWebSocket } from "@/lib/websocket-context"

interface PresenceUser {
  id: string
  name: string
  status: "online" | "away" | "offline"
  avatar: string
}

export default function PresenceIndicator() {
  const { isConnected } = useWebSocket()
  const [users, setUsers] = useState<PresenceUser[]>([
    { id: "1", name: "You", status: "online", avatar: "👤" },
    { id: "2", name: "Sarah Chen", status: "online", avatar: "👩" },
    { id: "3", name: "Mike Johnson", status: "away", avatar: "👨" },
  ])

  useEffect(() => {
    if (!isConnected) return

    // Simulate presence updates
    const interval = setInterval(() => {
      setUsers((prev) =>
        prev.map((user) => ({
          ...user,
          status: Math.random() > 0.7 ? "away" : "online",
        })),
      )
    }, 15000)

    return () => clearInterval(interval)
  }, [isConnected])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="flex items-center gap-2">
      {users.map((user) => (
        <div key={user.id} className="relative group" title={`${user.name} - ${user.status}`}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
            {user.avatar}
          </div>
          <div
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`}
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {user.name}
          </div>
        </div>
      ))}
    </div>
  )
}
