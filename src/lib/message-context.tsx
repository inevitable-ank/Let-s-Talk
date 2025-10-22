"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"

export interface Message {
  id: string
  author: string
  content: string
  timestamp: string
  isUser: boolean
  reactions?: Record<string, number>
  threadCount?: number
  threadId?: string
}

interface MessageContextType {
  messages: Message[]
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void
  updateMessage: (id: string, updates: Partial<Message>) => void
  deleteMessage: (id: string) => void
  addReaction: (messageId: string, emoji: string) => void
  removeReaction: (messageId: string, emoji: string) => void
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      author: "Creative Director",
      content: "Hey! Are you here?",
      timestamp: "13:53",
      isUser: false,
      reactions: { "👍": 1 },
      threadCount: 2,
    },
    {
      id: "2",
      author: "You",
      content: "Yeah...",
      timestamp: "13:53",
      isUser: true,
      reactions: {},
    },
    {
      id: "3",
      author: "Creative Director",
      content: "Great work on the slides! Love it! Just one more thing...",
      timestamp: "13:53",
      isUser: false,
      reactions: { "❤️": 2, "🎉": 1 },
      threadCount: 1,
    },
  ])

  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: String(Date.now()),
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      reactions: {},
    }
    setMessages((prev) => [...prev, newMessage])
  }, [])

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)))
  }, [])

  const deleteMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  const addReaction = useCallback((messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || {}
          return {
            ...msg,
            reactions: {
              ...reactions,
              [emoji]: (reactions[emoji] || 0) + 1,
            },
          }
        }
        return msg
      }),
    )
  }, [])

  const removeReaction = useCallback((messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || {}
          const count = reactions[emoji] || 0
          if (count <= 1) {
            const { [emoji]: _, ...rest } = reactions
            return { ...msg, reactions: rest }
          }
          return {
            ...msg,
            reactions: {
              ...reactions,
              [emoji]: count - 1,
            },
          }
        }
        return msg
      }),
    )
  }, [])

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, updateMessage, deleteMessage, addReaction, removeReaction }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export function useMessages() {
  const context = useContext(MessageContext)
  if (!context) {
    throw new Error("useMessages must be used within MessageProvider")
  }
  return context
}
