import { X } from "lucide-react"
import { operators } from "@/data/operators"
import type { QueryBlock as QueryBlockType } from "@/data/types"

interface QueryBlockProps {
  block: QueryBlockType
  onChange: (id: string, value: string) => void
  onDelete: (id: string) => void
}

export default function QueryBlock({
  block,
  onChange,
  onDelete,
}: QueryBlockProps) {
  const operator = operators.find((op) => op.id === block.operator)
  const syntax = operator ? operator.syntax : block.operator
  const placeholder = operator?.placeholder || "Value..."
  const operatorType = operator?.type || "prefix"

  // Different styling based on operator type
  const badgeStyles: Record<string, string> = {
    prefix: "bg-primary/10 text-primary",
    separator: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    modifier: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    logical: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  }

  const badgeClass = badgeStyles[operatorType] || badgeStyles.prefix

  return (
    <div className="group flex items-center gap-2 rounded-lg border bg-card px-3 py-2 shadow-sm transition-all hover:shadow-md hover:border-primary/30">

      {/* Operator badge */}
      <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-semibold ${badgeClass}`}>
        {syntax.trim()}
      </span>

      {/* Input */}
      <input
        value={block.value}
        onChange={(e) => onChange(block.id, e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
      />

      {/* Delete button - appears on hover */}
      <button
        onClick={() => onDelete(block.id)}
        className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
        title="Remove block"
      >
        <X size={14} />
      </button>

    </div>
  )
}
