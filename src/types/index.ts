export interface User {
    id: string
    name: string
    email: string
    avatar?: string
    status: "online" | "offline" | "away"
  }
  
  export interface Message {
    id: string
    conversationId: string
    author: User
    content: string
    timestamp: Date
    reactions?: Reaction[]
    thread?: Message[]
    lcgNodes?: LCGNode[]
  }
  
  export interface Conversation {
    id: string
    name: string
    participants: User[]
    messages: Message[]
    createdAt: Date
    updatedAt: Date
    lcgEnabled: boolean
  }
  
  export interface LCGNode {
    id: string
    type: "task" | "decision" | "deadline" | "document" | "person"
    label: string
    confidence: number
    sourceMessage: string
    relatedNodes: string[]
    metadata?: Record<string, any>
  }
  
  export interface Reaction {
    emoji: string
    users: User[]
  }
  
  export interface Task {
    id: string
    title: string
    description: string
    assignee?: User
    dueDate?: Date
    status: "todo" | "in-progress" | "done"
    priority: "low" | "medium" | "high"
    sourceMessage?: string
  }
  