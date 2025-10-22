"use client"
import { useEffect, useRef, useState } from "react"
import { useLCG } from "@/lib/lcg-context"
import LCGNodeDetail from "./lcg-node-detail"

interface NodePosition {
  x: number
  y: number
}

export default function LCGVisualization() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { nodes, edges, selectedNode, setSelectedNode } = useLCG()
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map())

  useEffect(() => {
    const positions = new Map<string, NodePosition>()
    const centerX = 400
    const centerY = 300

    // Calculate positions using improved circular layout
    nodes.forEach((node, index) => {
      const angle = (index / Math.max(nodes.length, 1)) * Math.PI * 2
      const radius = 200 + (index % 3) * 40 // Varied radius for depth
      positions.set(node.id, {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      })
    })

    setNodePositions(positions)
  }, [nodes])

  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (node) setSelectedNode(node)
  }

  const getNodeColor = (type: string) => {
    const colors: Record<string, { bg: string; accent: string; text: string }> = {
      topic: { bg: "#4F46E5", accent: "#818CF8", text: "#E0E7FF" },
      task: { bg: "#10B981", accent: "#6EE7B7", text: "#D1FAE5" },
      insight: { bg: "#06B6D4", accent: "#67E8F9", text: "#CFFAFE" },
      decision: { bg: "#F59E0B", accent: "#FCD34D", text: "#FEF3C7" },
    }
    return colors[type] || colors.topic
  }

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg border border-slate-700 overflow-hidden relative">
        <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Gradient definitions for nodes */}
            {nodes.map((node) => {
              const colors = getNodeColor(node.type)
              return (
                <linearGradient key={`grad-${node.id}`} id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.bg} stopOpacity="1" />
                  <stop offset="100%" stopColor={colors.accent} stopOpacity="0.8" />
                </linearGradient>
              )
            })}

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Shadow filter */}
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Draw edges with improved styling */}
          {edges.map((edge, idx) => {
            const source = nodePositions.get(edge.source)
            const target = nodePositions.get(edge.target)
            if (!source || !target) return null

            return (
              <g key={`edge-${idx}`}>
                {/* Edge glow */}
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="rgba(99, 102, 241, 0.2)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Main edge */}
                <line
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="rgba(99, 102, 241, 0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>
            )
          })}

          {/* Draw nodes with improved styling */}
          {nodes.map((node) => {
            const pos = nodePositions.get(node.id)
            if (!pos) return null

            const isSelected = selectedNode?.id === node.id
            const isHovered = hoveredNode === node.id
            const colors = getNodeColor(node.type)
            const radius = 45

            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer transition-all duration-300"
              >
                {/* Node shadow */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={radius + (isSelected ? 8 : isHovered ? 4 : 0)}
                  fill="rgba(0, 0, 0, 0.3)"
                  filter="url(#shadow)"
                />

                {/* Node background with gradient */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={radius}
                  fill={`url(#gradient-${node.id})`}
                  filter="url(#glow)"
                  className={`transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-90"}`}
                />

                {/* Selection ring */}
                {isSelected && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius + 8}
                    fill="none"
                    stroke="rgba(99, 102, 241, 0.8)"
                    strokeWidth="3"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                )}

                {/* Hover ring */}
                {isHovered && !isSelected && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={radius + 4}
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="2"
                    opacity="0.6"
                  />
                )}

                {/* Node label with improved typography */}
                <text
                  x={pos.x}
                  y={pos.y - 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-bold text-sm fill-white pointer-events-none"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {node.label}
                </text>

                {/* Node type badge */}
                <text
                  x={pos.x}
                  y={pos.y + 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white pointer-events-none"
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    opacity: 0.9,
                  }}
                >
                  {node.type}
                </text>

                {/* Message count indicator */}
                <circle cx={pos.x + radius - 8} cy={pos.y - radius + 8} r="12" fill={colors.accent} opacity="0.9" />
                <text
                  x={pos.x + radius - 8}
                  y={pos.y - radius + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-900 pointer-events-none font-bold"
                  style={{ fontSize: "9px" }}
                >
                  {node.messageCount}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur border border-slate-700 rounded-lg p-3 text-xs space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
            <span className="text-slate-300">Topics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-300">Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-slate-300">Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-slate-300">Decisions</span>
          </div>
        </div>
      </div>

      {/* Node detail panel */}
      {selectedNode && <LCGNodeDetail node={selectedNode} />}
    </div>
  )
}
