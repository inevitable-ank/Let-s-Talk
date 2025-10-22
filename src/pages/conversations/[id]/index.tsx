
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, Archive, Trash2, Download } from "lucide-react"

export default function ConversationDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [conversation] = useState({
    id: id,
    title: "Product Launch Planning",
    description: "Discussion about Q4 product launch strategy and timeline",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    participants: [
      { id: "1", name: "You", avatar: "👤" },
      { id: "2", name: "Sarah Chen", avatar: "👩" },
      { id: "3", name: "Mike Johnson", avatar: "👨" },
    ],
    messageCount: 127,
    taskCount: 12,
    insightCount: 8,
    tags: ["product", "launch", "strategy", "q4"],
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{conversation.title}</h1>
            <p className="text-foreground-secondary mt-1">{conversation.description}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Archive className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="text-destructive bg-transparent">
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{conversation.messageCount}</div>
              <p className="text-xs text-foreground-secondary mt-1">Total messages in conversation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Tasks Extracted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{conversation.taskCount}</div>
              <p className="text-xs text-foreground-secondary mt-1">Actionable tasks identified</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{conversation.insightCount}</div>
              <p className="text-xs text-foreground-secondary mt-1">Key insights extracted</p>
            </CardContent>
          </Card>
        </div>

        {/* Participants */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Participants</CardTitle>
            <CardDescription>People involved in this conversation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {conversation.participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                  <div className="text-2xl">{participant.avatar}</div>
                  <div>
                    <p className="font-medium text-foreground">{participant.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Topics and categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {conversation.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="text-sm font-medium text-foreground-secondary min-w-24">Created</div>
              <div className="text-sm text-foreground">{conversation.createdAt.toLocaleDateString()}</div>
            </div>
            <div className="flex gap-4">
              <div className="text-sm font-medium text-foreground-secondary min-w-24">Last Updated</div>
              <div className="text-sm text-foreground">{conversation.updatedAt.toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
