
import type { ReactNode } from "react"
import { WebSocketProvider } from "@/lib/websocket-context"
import { useWebSocket } from "@/lib/websocket-context"
import { Wifi, WifiOff } from "lucide-react"

function ConnectionIndicator() {
  const { isConnected } = useWebSocket()

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border shadow-lg">
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4 text-green-500" />
          <span className="text-xs font-medium text-foreground">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-medium text-foreground">Connecting...</span>
        </>
      )}
    </div>
  )
}

interface AppShellProps {
  children: ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <WebSocketProvider>
      <div className="h-screen w-screen overflow-hidden bg-background">
        {children}
        <ConnectionIndicator />
      </div>
    </WebSocketProvider>
  )
}
