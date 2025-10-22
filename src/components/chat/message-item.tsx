
import { MessageCircle, ThumbsUp, Share2, Trash2, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { useMessages } from "@/lib/message-context"
import type { Message } from "@/lib/message-context"

interface MessageItemProps {
  message: Message
}

const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🎉", "🔥", "✨"]

export default function MessageItem({ message }: MessageItemProps) {
  const { addReaction, removeReaction, deleteMessage } = useMessages()
  const [showReactions, setShowReactions] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleReaction = (emoji: string) => {
    const hasReacted = (message.reactions?.[emoji] || 0) > 0
    if (hasReacted) {
      removeReaction(message.id, emoji)
    } else {
      addReaction(message.id, emoji)
    }
    setShowReactions(false)
  }

  return (
    <div className={`flex gap-3 group ${message.isUser ? "justify-end" : "justify-start"}`}>
      {!message.isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 shadow-sm">
          {message.author.charAt(0)}
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-md ${message.isUser ? "items-end" : "items-start"}`}>
        {!message.isUser && <p className="text-xs font-semibold text-foreground-secondary">{message.author}</p>}

        <div className="relative">
          <div
            className={`px-4 py-2 rounded-lg transition-smooth ${
              message.isUser
                ? "bg-primary text-white rounded-br-none shadow-md hover:shadow-lg"
                : "bg-surface-secondary text-foreground rounded-bl-none hover:bg-border"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>

          {message.reactions && Object.keys(message.reactions).length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap animate-in fade-in duration-200">
              {Object.entries(message.reactions).map(([emoji, count]) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="px-2 py-1 rounded-full bg-surface-secondary hover:bg-surface text-xs transition-smooth hover:scale-110"
                  title={`${count} reaction${count > 1 ? "s" : ""}`}
                >
                  {emoji} {count > 1 && count}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-foreground-secondary">
          <span>{message.timestamp}</span>
          {message.threadCount && message.threadCount > 0 && (
            <button className="text-primary hover:underline transition-smooth">{message.threadCount} replies</button>
          )}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className="hover:text-primary transition-smooth"
              title="React"
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button className="hover:text-primary transition-smooth" title="Reply">
              <MessageCircle className="w-3 h-3" />
            </button>
            <button className="hover:text-primary transition-smooth" title="Share">
              <Share2 className="w-3 h-3" />
            </button>
            {message.isUser && (
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="hover:text-primary transition-smooth"
                title="More options"
              >
                <MoreHorizontal className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {showReactions && (
          <div className="absolute bottom-full mb-2 bg-background border border-border rounded-lg p-2 flex gap-1 shadow-lg z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {REACTION_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="hover:scale-125 transition-transform text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {showMenu && message.isUser && (
          <div className="absolute bottom-full mb-2 bg-background border border-border rounded-lg shadow-lg z-10 min-w-max animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button
              onClick={() => {
                deleteMessage(message.id)
                setShowMenu(false)
              }}
              className="w-full px-4 py-2 text-sm text-destructive hover:bg-surface-secondary flex items-center gap-2 rounded-lg transition-smooth"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
