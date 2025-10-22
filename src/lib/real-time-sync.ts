export interface SyncEvent {
    id: string
    type: "create" | "update" | "delete"
    entity: "message" | "task" | "lcg-node" | "conversation"
    data: unknown
    timestamp: number
    userId: string
  }
  
  export class RealtimeSync {
    private queue: SyncEvent[] = []
    private isSyncing = false
  
    async queueEvent(event: SyncEvent): Promise<void> {
      this.queue.push(event)
      if (!this.isSyncing) {
        await this.flush()
      }
    }
  
    async flush(): Promise<void> {
      if (this.isSyncing || this.queue.length === 0) return
  
      this.isSyncing = true
      try {
        const events = [...this.queue]
        this.queue = []
  
        // Simulate API call to sync events
        await new Promise((resolve) => setTimeout(resolve, 100))
        console.log("[v0] Synced events:", events)
      } finally {
        this.isSyncing = false
      }
    }
  
    getQueueSize(): number {
      return this.queue.length
    }
  }
  
  export const realtimeSync = new RealtimeSync()
  