"use client"

import { useState } from "react"
import ConversationList from "@/components/chat/conversation-list"
import ChatView from "@/components/chat/chat-view"
import LCGVisualization from "@/components/lcg/lcg-visualization"
import TaskList from "@/components/tasks/task-list"
import { useSidebar } from "@/lib/sidebar-context"

export default function Home() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"chat" | "lcg" | "tasks">("chat")
  const { isCollapsed } = useSidebar()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Conversation List - Hidden on mobile, visible on desktop */}
      <div
        className={`hidden md:flex md:border-r border-border flex-col bg-surface transition-all duration-300 ${isCollapsed ? "md:w-64" : "md:w-80"}`}
      >
        <ConversationList selectedId={selectedConversation} onSelect={setSelectedConversation} />
      </div>

      {/* Main Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4 bg-surface gap-2 flex-shrink-0">
            <h2 className="text-lg font-semibold text-foreground">Product Launch Planning</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("chat")}
                className={`px-3 py-1 text-sm rounded-lg transition-smooth ${
                  viewMode === "chat" ? "bg-primary text-white" : "bg-surface-secondary text-foreground hover:bg-border"
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setViewMode("lcg")}
                className={`px-3 py-1 text-sm rounded-lg transition-smooth ${
                  viewMode === "lcg" ? "bg-primary text-white" : "bg-surface-secondary text-foreground hover:bg-border"
                }`}
              >
                LCG
              </button>
              <button
                onClick={() => setViewMode("tasks")}
                className={`px-3 py-1 text-sm rounded-lg transition-smooth ${
                  viewMode === "tasks"
                    ? "bg-primary text-white"
                    : "bg-surface-secondary text-foreground hover:bg-border"
                }`}
              >
                Tasks
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            {viewMode === "chat" && <ChatView conversationId={selectedConversation} />}
            {viewMode === "lcg" && <LCGVisualization />}
            {viewMode === "tasks" && <TaskList conversationId={selectedConversation} />}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-surface">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome to LumenChat</h2>
            <p className="text-foreground-secondary">Select a conversation to start chatting</p>
          </div>
        </div>
      )}
    </div>
  )
}
