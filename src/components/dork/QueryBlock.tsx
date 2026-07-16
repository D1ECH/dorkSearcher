import { X } from "lucide-react"
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
  return (
    <div className="rounded-lg border bg-muted p-4">

      <div className="mb-3 flex items-center justify-between">

        <span className="font-medium">
          {block.operator}
        </span>

        <button
          onClick={() => onDelete(block.id)}
          className="rounded p-1 hover:bg-accent"
        >
          <X size={16} />
        </button>

      </div>

      <input
        value={block.value}
        onChange={(e) => onChange(block.id, e.target.value)}
        placeholder="Value..."
        className="w-full border-b bg-transparent outline-none"
      />

    </div>
  )
}