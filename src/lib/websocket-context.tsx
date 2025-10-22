
import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"

interface WebSocketMessage {
  type: "message" | "typing" | "reaction" | "task" | "presence" | "lcg-update"
  payload: unknown
  userId: string
  timestamp: number
}

interface WebSocketContextType {
  isConnected: boolean
  sendMessage: (message: WebSocketMessage) => void
  onMessage: (callback: (message: WebSocketMessage) => void) => void
  offMessage: (callback: (message: WebSocketMessage) => void) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [listeners, setListeners] = useState<Set<(message: WebSocketMessage) => void>>(new Set())

  // Simulate WebSocket connection
  useEffect(() => {
    // In production, this would connect to a real WebSocket server
    const timer = setTimeout(() => {
      setIsConnected(true)
      console.log("[v0] WebSocket connected")
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const sendMessage = useCallback(
    (message: WebSocketMessage) => {
      if (isConnected) {
        console.log("[v0] Sending WebSocket message:", message)
        // In production, this would send to the WebSocket server
        // ws.send(JSON.stringify(message))
      }
    },
    [isConnected],
  )

  const onMessage = useCallback((callback: (message: WebSocketMessage) => void) => {
    setListeners((prev) => new Set(prev).add(callback))
  }, [])

  const offMessage = useCallback((callback: (message: WebSocketMessage) => void) => {
    setListeners((prev) => {
      const newSet = new Set(prev)
      newSet.delete(callback)
      return newSet
    })
  }, [])

  // Simulate receiving messages
  useEffect(() => {
    if (!isConnected) return

    const interval = setInterval(() => {
      const mockMessages: WebSocketMessage[] = [
        {
          type: "presence",
          payload: { userId: "user-2", status: "online" },
          userId: "user-2",
          timestamp: Date.now(),
        },
      ]

      const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)]
      listeners.forEach((listener) => listener(randomMessage))
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [isConnected, listeners])

  return (
    <WebSocketContext.Provider value={{ isConnected, sendMessage, onMessage, offMessage }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider")
  }
  return context
}
