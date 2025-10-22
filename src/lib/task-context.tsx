"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  assignee?: string
  dueDate?: string
  sourceMessageId?: string
  conversationId: string
  createdAt: string
  tags: string[]
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, "id" | "createdAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  extractTasksFromMessage: (messageContent: string, conversationId: string, messageId: string) => void
  getTasksByConversation: (conversationId: string) => Task[]
  getTasksByStatus: (status: Task["status"]) => Task[]
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Finalize design mockups",
    description: "Complete all design mockups for the product launch",
    status: "in-progress",
    priority: "high",
    assignee: "Creative Director",
    dueDate: "2024-11-15",
    sourceMessageId: "3",
    conversationId: "1",
    createdAt: new Date().toISOString(),
    tags: ["design", "urgent"],
  },
  {
    id: "2",
    title: "Get budget approval",
    description: "Obtain budget approval from management for Q4 launch",
    status: "todo",
    priority: "high",
    assignee: "Project Manager",
    dueDate: "2024-11-10",
    conversationId: "1",
    createdAt: new Date().toISOString(),
    tags: ["budget", "approval"],
  },
  {
    id: "3",
    title: "Prepare API endpoints",
    description: "Ensure all API endpoints are ready for testing",
    status: "completed",
    priority: "medium",
    assignee: "Engineering Lead",
    dueDate: "2024-11-08",
    conversationId: "1",
    createdAt: new Date().toISOString(),
    tags: ["backend", "api"],
  },
]

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
  }, [])

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  const extractTasksFromMessage = useCallback(
    (messageContent: string, conversationId: string, messageId: string) => {
      // Simple extraction logic - in production, this would use AI
      const taskPatterns = [
        /(?:need to|should|must|have to)\s+([^.!?]+)/gi,
        /(?:TODO|FIXME|ACTION):\s*([^.!?]+)/gi,
        /(?:complete|finish|do|make)\s+([^.!?]+)/gi,
      ]

      const extractedTasks = new Set<string>()
      taskPatterns.forEach((pattern) => {
        let match
        while ((match = pattern.exec(messageContent)) !== null) {
          extractedTasks.add(match[1].trim())
        }
      })

      extractedTasks.forEach((taskTitle) => {
        addTask({
          title: taskTitle,
          description: `Extracted from conversation: "${messageContent.substring(0, 100)}..."`,
          status: "todo",
          priority: "medium",
          sourceMessageId: messageId,
          conversationId,
          tags: ["extracted"],
        })
      })
    },
    [addTask],
  )

  const getTasksByConversation = useCallback(
    (conversationId: string) => {
      return tasks.filter((task) => task.conversationId === conversationId)
    },
    [tasks],
  )

  const getTasksByStatus = useCallback(
    (status: Task["status"]) => {
      return tasks.filter((task) => task.status === status)
    },
    [tasks],
  )

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        extractTasksFromMessage,
        getTasksByConversation,
        getTasksByStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider")
  }
  return context
}
