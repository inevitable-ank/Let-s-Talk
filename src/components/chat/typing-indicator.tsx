
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 bg-foreground-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <div
        className="w-2 h-2 bg-foreground-secondary rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <div
        className="w-2 h-2 bg-foreground-secondary rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  )
}
