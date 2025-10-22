import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Zap, MoreVertical } from "lucide-react"
import MessageItem from "./message-item"
import TypingIndicator from "./typing-indicator"
import PresenceIndicator from "./presence-indicator"
import { Button } from "@/components/ui/button"
import { useMessages } from "@/lib/message-context"
import { useWebSocket } from "@/lib/websocket-context"
import TaskExtractionPanel from "@/components/tasks/task-extraction-panel"

interface ChatViewProps {
  conversationId: string
}

export default function ChatView({ conversationId }: ChatViewProps) {
  const { messages, addMessage } = useMessages()
  const { isConnected, sendMessage } = useWebSocket()
  const [inputValue, setInputValue] = useState("")
  const [extractionMessage, setExtractionMessage] = useState<{
    id: string
    content: string
  } | null>(null)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout>()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addMessage({
        author: "You",
        content: inputValue,
        isUser: true,
      })

      if (isConnected) {
        sendMessage({
          type: "message",
          payload: { content: inputValue, conversationId },
          userId: "current-user",
          timestamp: Date.now(),
        })
      }

      setInputValue("")
      setIsTyping(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)

    if (!isTyping && e.target.value.length > 0) {
      setIsTyping(true)
      if (isConnected) {
        sendMessage({
          type: "typing",
          payload: { conversationId, isTyping: true },
          userId: "current-user",
          timestamp: Date.now(),
        })
      }
    }

    // Clear typing indicator after 3 seconds of inactivity
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      if (isConnected) {
        sendMessage({
          type: "typing",
          payload: { conversationId, isTyping: false },
          userId: "current-user",
          timestamp: Date.now(),
        })
      }
    }, 3000)
  }

  return (
    <div className="flex-1 flex flex-col bg-background h-screen">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between bg-surface">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Product Launch Planning</h2>
          <p className="text-xs text-foreground-secondary">3 members</p>
        </div>
        <div className="flex items-center gap-4">
          <PresenceIndicator />
          <Button variant="ghost" size="sm" className="rounded-full">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            onContextMenu={(e) => {
              e.preventDefault()
              setExtractionMessage({ id: message.id, content: message.content })
            }}
            className="animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            <MessageItem message={message} />
          </div>
        ))}

        {typingUsers.length > 0 && (
          <div className="flex gap-3 animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center text-xs font-semibold flex-shrink-0">
              {typingUsers[0].charAt(0)}
            </div>
            <div className="flex items-center gap-1 px-4 py-2 rounded-lg bg-surface-secondary">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-surface">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Enter Message"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full hover:bg-surface-secondary transition-smooth"
              title="LCG Insights"
            >
              <Zap className="w-4 h-4 text-primary" />
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary-dark text-white rounded-lg px-4 transition-smooth"
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {extractionMessage && (
        <TaskExtractionPanel
          messageContent={extractionMessage.content}
          messageId={extractionMessage.id}
          conversationId={conversationId}
          onClose={() => setExtractionMessage(null)}
        />
      )}
    </div>
  )
}
