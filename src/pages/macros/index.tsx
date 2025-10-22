import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Copy } from "lucide-react"

interface Macro {
  id: string
  name: string
  description: string
  trigger: string
  response: string
  category: string
  usageCount: number
}

export default function MacrosPage() {
  const [macros, setMacros] = useState<Macro[]>([
    {
      id: "1",
      name: "Meeting Summary",
      description: "Generates a summary of the meeting discussion",
      trigger: "/summary",
      response: "Summarize the key points from this conversation",
      category: "productivity",
      usageCount: 24,
    },
    {
      id: "2",
      name: "Action Items",
      description: "Extracts all action items from conversation",
      trigger: "/actions",
      response: "List all action items and their owners",
      category: "tasks",
      usageCount: 18,
    },
    {
      id: "3",
      name: "Decision Log",
      description: "Documents all decisions made",
      trigger: "/decisions",
      response: "What decisions were made in this conversation?",
      category: "documentation",
      usageCount: 12,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredMacros = macros.filter(
    (macro) =>
      macro.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      macro.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setMacros(macros.filter((m) => m.id !== id))
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      productivity: "bg-blue-100 text-blue-800",
      tasks: "bg-green-100 text-green-800",
      documentation: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Macros</h1>
            <p className="text-foreground-secondary mt-1">Create and manage conversation macros for quick responses</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark gap-2">
            <Plus className="w-4 h-4" />
            New Macro
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search macros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-surface border-border"
          />
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMacros.map((macro) => (
            <Card key={macro.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{macro.name}</CardTitle>
                    <CardDescription className="mt-1">{macro.description}</CardDescription>
                  </div>
                  <Badge className={getCategoryColor(macro.category)}>{macro.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-foreground-secondary mb-1">Trigger</p>
                  <code className="text-sm bg-surface p-2 rounded block text-foreground font-mono">
                    {macro.trigger}
                  </code>
                </div>

                <div>
                  <p className="text-xs font-medium text-foreground-secondary mb-1">Response</p>
                  <p className="text-sm text-foreground line-clamp-2">{macro.response}</p>
                </div>

                <div className="text-xs text-foreground-secondary">Used {macro.usageCount} times</div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                    onClick={() => handleDelete(macro.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMacros.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-foreground-secondary mb-4">No macros found</p>
              <Button className="bg-primary hover:bg-primary-dark gap-2">
                <Plus className="w-4 h-4" />
                Create Your First Macro
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
