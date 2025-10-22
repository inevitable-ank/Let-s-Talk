"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface ConversationNode {
  id: string
  label: string
  type: "topic" | "task" | "insight" | "decision"
  color: string
  size: number
  x?: number
  y?: number
  connections: string[]
  messageCount: number
}

export interface ConversationEdge {
  source: string
  target: string
  weight: number
  type: "related" | "depends" | "references"
}

interface LCGContextType {
  nodes: ConversationNode[]
  edges: ConversationEdge[]
  addNode: (node: Omit<ConversationNode, "id">) => void
  addEdge: (edge: ConversationEdge) => void
  updateNode: (id: string, updates: Partial<ConversationNode>) => void
  removeNode: (id: string) => void
  selectedNode: ConversationNode | null
  setSelectedNode: (node: ConversationNode | null) => void
}

const LCGContext = createContext<LCGContextType | undefined>(undefined)

const MOCK_NODES: ConversationNode[] = [
  {
    id: "1",
    label: "Product Launch",
    type: "topic",
    color: "#6366f1",
    size: 40,
    connections: ["2", "3", "4"],
    messageCount: 12,
  },
  {
    id: "2",
    label: "Design Review",
    type: "topic",
    color: "#8b5cf6",
    size: 30,
    connections: ["1", "5"],
    messageCount: 8,
  },
  {
    id: "3",
    label: "Timeline",
    type: "task",
    color: "#10b981",
    size: 25,
    connections: ["1", "6"],
    messageCount: 5,
  },
  {
    id: "4",
    label: "Budget Approval",
    type: "decision",
    color: "#f59e0b",
    size: 28,
    connections: ["1"],
    messageCount: 6,
  },
  {
    id: "5",
    label: "Mockups Ready",
    type: "insight",
    color: "#06b6d4",
    size: 22,
    connections: ["2"],
    messageCount: 3,
  },
  {
    id: "6",
    label: "Q4 Deadline",
    type: "task",
    color: "#10b981",
    size: 20,
    connections: ["3"],
    messageCount: 2,
  },
]

const MOCK_EDGES: ConversationEdge[] = [
  { source: "1", target: "2", weight: 3, type: "related" },
  { source: "1", target: "3", weight: 2, type: "depends" },
  { source: "1", target: "4", weight: 2, type: "depends" },
  { source: "2", target: "5", weight: 2, type: "references" },
  { source: "3", target: "6", weight: 1, type: "depends" },
]

export function LCGProvider({ children }: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<ConversationNode[]>(MOCK_NODES)
  const [edges, setEdges] = useState<ConversationEdge[]>(MOCK_EDGES)
  const [selectedNode, setSelectedNode] = useState<ConversationNode | null>(null)

  const addNode = useCallback((node: Omit<ConversationNode, "id">) => {
    const newNode: ConversationNode = {
      ...node,
      id: String(Date.now()),
    }
    setNodes((prev) => [...prev, newNode])
  }, [])

  const addEdge = useCallback((edge: ConversationEdge) => {
    setEdges((prev) => [...prev, edge])
  }, [])

  const updateNode = useCallback((id: string, updates: Partial<ConversationNode>) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, ...updates } : node)))
  }, [])

  const removeNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id))
    setEdges((prev) => prev.filter((edge) => edge.source !== id && edge.target !== id))
  }, [])

  return (
    <LCGContext.Provider
      value={{ nodes, edges, addNode, addEdge, updateNode, removeNode, selectedNode, setSelectedNode }}
    >
      {children}
    </LCGContext.Provider>
  )
}

export function useLCG() {
  const context = useContext(LCGContext)
  if (!context) {
    throw new Error("useLCG must be used within LCGProvider")
  }
  return context
}
