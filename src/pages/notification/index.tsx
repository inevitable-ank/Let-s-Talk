
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Trash2, CheckCircle2 } from "lucide-react"

interface Notification {
  id: string
  type: "mention" | "task" | "insight" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "mention",
      title: "You were mentioned",
      message: "Sarah Chen mentioned you in Product Launch Planning",
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      actionUrl: "/",
    },
    {
      id: "2",
      type: "task",
      title: "Task assigned",
      message: "Finalize pricing strategy has been assigned to you",
      timestamp: new Date(Date.now() - 30 * 60000),
      read: false,
      actionUrl: "/",
    },
    {
      id: "3",
      type: "insight",
      title: "New insight extracted",
      message: "Market opportunity identified in Product Launch Planning",
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: true,
      actionUrl: "/",
    },
    {
      id: "4",
      type: "system",
      title: "System update",
      message: "LumenChat has been updated with new features",
      timestamp: new Date(Date.now() - 24 * 3600000),
      read: true,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mention":
        return "bg-blue-100 text-blue-800"
      case "task":
        return "bg-green-100 text-green-800"
      case "insight":
        return "bg-yellow-100 text-yellow-800"
      case "system":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Bell className="w-8 h-8" />
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="text-foreground-secondary mt-1">You have {unreadCount} unread notifications</p>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="bg-surface">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-6">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-all ${!notification.read ? "bg-surface border-primary/20" : ""}`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(notification.type)} variant="secondary">
                          {notification.type}
                        </Badge>
                        <span className="text-xs text-foreground-secondary">{formatTime(notification.timestamp)}</span>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full ml-auto" />}
                      </div>
                      <h3 className="font-semibold text-foreground">{notification.title}</h3>
                      <p className="text-sm text-foreground-secondary mt-1">{notification.message}</p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          title="Mark as read"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3 mt-6">
            {notifications
              .filter((n) => !n.read)
              .map((notification) => (
                <Card key={notification.id} className="bg-surface border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getTypeColor(notification.type)} variant="secondary">
                            {notification.type}
                          </Badge>
                          <span className="text-xs text-foreground-secondary">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        <p className="text-sm text-foreground-secondary mt-1">{notification.message}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(notification.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="mentions" className="space-y-3 mt-6">
            {notifications
              .filter((n) => n.type === "mention")
              .map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <Badge className={`${getTypeColor(notification.type)} mb-2`} variant="secondary">
                          {notification.type}
                        </Badge>
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        <p className="text-sm text-foreground-secondary mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-3 mt-6">
            {notifications
              .filter((n) => n.type === "task")
              .map((notification) => (
                <Card key={notification.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <Badge className={`${getTypeColor(notification.type)} mb-2`} variant="secondary">
                          {notification.type}
                        </Badge>
                        <h3 className="font-semibold text-foreground">{notification.title}</h3>
                        <p className="text-sm text-foreground-secondary mt-1">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
