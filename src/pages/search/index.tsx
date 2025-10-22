
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MessageSquare, Lightbulb } from "lucide-react"

interface SearchResult {
  id: string
  type: "message" | "insight" | "task"
  title: string
  preview: string
  conversationId: string
  conversationTitle: string
  date: Date
  relevance: number
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([
    {
      id: "1",
      type: "message",
      title: "Launch Timeline Discussion",
      preview: "We should aim for a Q4 launch to capture the holiday season market...",
      conversationId: "conv-1",
      conversationTitle: "Product Launch Planning",
      date: new Date("2024-01-20"),
      relevance: 0.95,
    },
    {
      id: "2",
      type: "insight",
      title: "Market Opportunity Identified",
      preview: "The team identified a significant market gap in the enterprise segment...",
      conversationId: "conv-1",
      conversationTitle: "Product Launch Planning",
      date: new Date("2024-01-19"),
      relevance: 0.87,
    },
    {
      id: "3",
      type: "task",
      title: "Finalize pricing strategy",
      preview: "Complete competitive analysis and finalize pricing tiers by end of week",
      conversationId: "conv-1",
      conversationTitle: "Product Launch Planning",
      date: new Date("2024-01-18"),
      relevance: 0.82,
    },
  ])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate search
    console.log("Searching for:", searchQuery)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-4 h-4" />
      case "insight":
        return <Lightbulb className="w-4 h-4" />
      case "task":
        return <MessageSquare className="w-4 h-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "message":
        return "bg-blue-100 text-blue-800"
      case "insight":
        return "bg-yellow-100 text-yellow-800"
      case "task":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search & Insights</h1>
          <p className="text-foreground-secondary">Find messages, insights, and tasks across all conversations</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-foreground-secondary" />
              <Input
                placeholder="Search conversations, messages, insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-surface border-border"
              />
            </div>
            <Button className="bg-primary hover:bg-primary-dark gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </form>

        {/* Results */}
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getTypeColor(result.type)} variant="secondary">
                          <span className="mr-1">{getTypeIcon(result.type)}</span>
                          {result.type}
                        </Badge>
                        <span className="text-xs text-foreground-secondary">{result.date.toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{result.title}</h3>
                      <p className="text-foreground-secondary text-sm mb-2">{result.preview}</p>
                      <p className="text-xs text-foreground-secondary">
                        From: <span className="font-medium">{result.conversationTitle}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-foreground">{Math.round(result.relevance * 100)}%</div>
                      <div className="text-xs text-foreground-secondary">relevance</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="w-12 h-12 text-foreground-secondary mx-auto mb-4 opacity-50" />
                <p className="text-foreground-secondary">No results found. Try a different search term.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
