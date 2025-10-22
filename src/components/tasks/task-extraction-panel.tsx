import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TaskExtractionPanelProps {
  messageId: string
  onClose: () => void
}

interface ExtractedTask {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  dueDate?: string
  assignee?: string
  status: "pending" | "in-progress" | "completed"
}

export default function TaskExtractionPanel({ onClose }: TaskExtractionPanelProps) {
  const [extractedTasks] = useState<ExtractedTask[]>([
    {
      id: "1",
      title: "Review product launch timeline",
      description: "Analyze the proposed timeline and provide feedback on feasibility",
      priority: "high",
      dueDate: "2024-01-25",
      assignee: "Sarah Chen",
      status: "pending"
    },
    {
      id: "2", 
      title: "Prepare marketing materials",
      description: "Create promotional content for the Q4 product launch",
      priority: "medium",
      dueDate: "2024-01-30",
      assignee: "Mike Johnson",
      status: "in-progress"
    },
    {
      id: "3",
      title: "Schedule team meeting",
      description: "Organize a meeting to discuss launch strategy",
      priority: "low",
      dueDate: "2024-01-22",
      status: "completed"
    }
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive"
      case "medium": return "default"
      case "low": return "secondary"
      default: return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in-progress": return <Clock className="w-4 h-4 text-blue-500" />
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Extracted Tasks</CardTitle>
          <CardDescription>AI has identified the following actionable tasks from this message</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {extractedTasks.map((task) => (
          <div key={task.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(task.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm text-foreground">{task.title}</h4>
                <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                  {task.priority}
                </Badge>
              </div>
              <p className="text-xs text-foreground-secondary mb-2">{task.description}</p>
              <div className="flex items-center gap-4 text-xs text-foreground-secondary">
                {task.dueDate && (
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                )}
                {task.assignee && (
                  <span>Assigned to: {task.assignee}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1">
            Add All Tasks
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}