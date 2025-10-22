
import { useState } from "react"
import { Search, Plus, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Conversation {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unread: number
  pinned: boolean
}

interface ConversationListProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "1",
    name: "Product Launch Planning",
    lastMessage: "Great work on the slides! Love it! Just one more thing...",
    timestamp: "2 min ago",
    unread: 2,
    pinned: true,
  },
  {
    id: "2",
    name: "Design Review",
    lastMessage: "The new mockups look amazing",
    timestamp: "1 hour ago",
    unread: 0,
    pinned: false,
  },
  {
    id: "3",
    name: "Engineering Sync",
    lastMessage: "API endpoints are ready for testing",
    timestamp: "3 hours ago",
    unread: 1,
    pinned: false,
  },
]

export default function ConversationList({ selectedId, onSelect }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = MOCK_CONVERSATIONS.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="w-80 bg-surface border-r border-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Conversations</h1>
          <Button variant="ghost" size="sm" className="rounded-full" title="New conversation">
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground placeholder-foreground-secondary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`p-4 border-b border-border cursor-pointer transition-smooth hover:bg-surface-secondary ${
              selectedId === conv.id ? "bg-surface-secondary" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">{conv.name}</h3>
              <div className="flex items-center gap-1">
                {conv.pinned && <Pin className="w-3 h-3 text-primary" />}
                {conv.unread > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-foreground-secondary line-clamp-2 mb-2">{conv.lastMessage}</p>
            <p className="text-xs text-foreground-secondary">{conv.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
