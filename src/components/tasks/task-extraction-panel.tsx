

import { Zap, X } from "lucide-react"
import { useState } from "react"
import { useTasks } from "@/lib/task-context"
import { Button } from "@/components/ui/button"

interface TaskExtractionPanelProps {
  messageContent: string
  messageId: string
  conversationId: string
  onClose: () => void
}

export default function TaskExtractionPanel({
  messageContent,
  messageId,
  conversationId,
  onClose,
}: TaskExtractionPanelProps) {
  const { extractTasksFromMessage } = useTasks()
  const [isExtracting, setIsExtracting] = useState(false)

  const handleExtract = async () => {
    setIsExtracting(true)
    // Simulate extraction delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    extractTasksFromMessage(messageContent, conversationId, messageId)
    setIsExtracting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Extract Tasks
          </h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-foreground-secondary mb-4">
          Extract actionable tasks from this message and add them to your task list.
        </p>

        <div className="bg-surface-secondary rounded p-3 mb-6 max-h-32 overflow-y-auto">
          <p className="text-sm text-foreground">{messageContent}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleExtract}
            disabled={isExtracting}
            className="flex-1 bg-primary hover:bg-primary-dark text-white"
          >
            {isExtracting ? "Extracting..." : "Extract Tasks"}
          </Button>
        </div>
      </div>
    </div>
  )
}
