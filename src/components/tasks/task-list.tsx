"use client"

import type React from "react"

import { Trash2, Edit2, CheckCircle2, Circle, AlertCircle } from "lucide-react"
import { useTasks } from "@/lib/task-context"
import type { Task } from "@/lib/task-context"
import { Button } from "@/components/ui/button"

interface TaskListProps {
  conversationId: string
}

const PRIORITY_COLORS: Record<string, string> = {
  low: "text-blue-600",
  medium: "text-amber-600",
  high: "text-red-600",
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  todo: <Circle className="w-4 h-4" />,
  "in-progress": <AlertCircle className="w-4 h-4" />,
  completed: <CheckCircle2 className="w-4 h-4" />,
}

export default function TaskList({ conversationId }: TaskListProps) {
  const { getTasksByConversation, updateTask, deleteTask } = useTasks()
  const tasks = getTasksByConversation(conversationId)

  const groupedTasks = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    completed: tasks.filter((t) => t.status === "completed"),
  }

  const renderTaskGroup = (status: Task["status"], title: string) => {
    const groupTasks = groupedTasks[status]
    if (groupTasks.length === 0) return null

    return (
      <div key={status} className="mb-6">
        <h3 className="text-sm font-semibold text-foreground-secondary mb-3 uppercase tracking-wide">{title}</h3>
        <div className="space-y-2">
          {groupTasks.map((task) => (
            <div
              key={task.id}
              className={`p-3 rounded-lg border transition-smooth ${
                status === "completed"
                  ? "bg-surface-secondary border-border opacity-60"
                  : "bg-background border-border hover:border-primary"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => {
                    const nextStatus: Record<string, Task["status"]> = {
                      todo: "in-progress",
                      "in-progress": "completed",
                      completed: "todo",
                    }
                    updateTask(task.id, { status: nextStatus[status] })
                  }}
                  className="mt-1 text-foreground-secondary hover:text-primary transition-smooth"
                >
                  {STATUS_ICONS[status]}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium ${status === "completed" ? "line-through text-foreground-secondary" : "text-foreground"}`}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-foreground-secondary mt-1">{task.description}</p>

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {task.assignee && (
                      <span className="text-xs bg-surface px-2 py-1 rounded text-foreground-secondary">
                        {task.assignee}
                      </span>
                    )}
                    <span className={`text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    {task.dueDate && (
                      <span className="text-xs text-foreground-secondary">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {task.tags.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="rounded">
                    <Edit2 className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded text-destructive hover:text-destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-foreground-secondary text-sm">No tasks yet. Extract tasks from messages to get started.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {renderTaskGroup("todo", "To Do")}
      {renderTaskGroup("in-progress", "In Progress")}
      {renderTaskGroup("completed", "Completed")}
    </div>
  )
}
