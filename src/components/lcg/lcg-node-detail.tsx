
import { X } from "lucide-react"
import { useLCG } from "@/lib/lcg-context"
import type { ConversationNode } from "@/lib/lcg-context"
import { Button } from "@/components/ui/button"

interface LCGNodeDetailProps {
  node: ConversationNode
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  topic: { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/30" },
  task: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  insight: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30" },
  decision: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
}

export default function LCGNodeDetail({ node }: LCGNodeDetailProps) {
  const { setSelectedNode, nodes } = useLCG()

  const connectedNodes = nodes.filter((n) => node.connections.includes(n.id))
  const colors = TYPE_COLORS[node.type] || TYPE_COLORS.topic

  return (
    <div className="w-80 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-5 flex flex-col gap-5 max-h-full overflow-y-auto shadow-2xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{node.label}</h3>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedNode(null)}
          className="rounded-full hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
          <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wide">Message Count</p>
          <p className={`text-3xl font-bold ${colors.text}`}>{node.messageCount}</p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">
            Connected Topics ({connectedNodes.length})
          </p>
          <div className="space-y-2">
            {connectedNodes.length > 0 ? (
              connectedNodes.map((connected) => (
                <div
                  key={connected.id}
                  className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer transition-all duration-200 group"
                >
                  <p className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {connected.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{connected.messageCount} messages</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 italic">No connections</p>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wide">Key Insights</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold mt-0.5">•</span>
              <span>Most discussed topic in conversation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold mt-0.5">•</span>
              <span>Central to {node.connections.length} other topics</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 font-bold mt-0.5">•</span>
              <span>{Math.round((node.messageCount / 50) * 100)}% of total discussion</span>
            </li>
          </ul>
        </div>
      </div>

      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors">
        View Thread
      </Button>
    </div>
  )
}
