import { useState, useMemo, useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import AddBlockButton from "./add_bloque_button"
import QueryBlock from "./QueryBlock"
import QueryPreview from "./QueryPreview"
import SaveDorkDialog from "./SaveDorkDialog"
import { operators } from "@/data/operators"

import type { QueryBlock as QueryBlockType } from "@/data/types"

export default function QueryCanvas() {
  const [blocks, setBlocks] = useState<QueryBlockType[]>([])

  // Load saved dork from sessionStorage if coming from Creations
  useEffect(() => {
    const loadData = sessionStorage.getItem("dorksearch-load")
    if (loadData) {
      try {
        const loadedBlocks = JSON.parse(loadData) as QueryBlockType[]
        setBlocks(loadedBlocks)
      } catch {
        // ignore parse error
      }
      sessionStorage.removeItem("dorksearch-load")
    }
  }, [])

  const query = useMemo(() => {
    return blocks
      .filter((block) => block.value.trim() !== "")
      .map((block) => {
        const operator = operators.find((op) => op.id === block.operator)
        if (!operator) return block.value
        const trimmedValue = block.value.trim()
        switch (operator.type) {
          case "prefix":
            return `${operator.syntax}${trimmedValue}`
          case "separator":
            return ` ${operator.syntax.trim()} ${trimmedValue}`
          case "modifier":
          case "logical":
            return `${operator.syntax}${trimmedValue}`
          default:
            return `${operator.syntax}${trimmedValue}`
        }
      })
      .join(" ")
  }, [blocks])

  function addBlock(operator: string) {
    setBlocks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        operator,
        value: "",
      },
    ])
  }

  function updateBlock(id: string, value: string) {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, value } : block))
    )
  }

  function deleteBlock(id: string) {
    setBlocks((prev) => prev.filter((block) => block.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Canvas */}
      <div className="rounded-xl border bg-background p-4">
        {blocks.length === 0 ? (
          <div className="flex min-h-[120px] flex-col items-center justify-center gap-3 text-muted-foreground">
            <div className="rounded-full border-2 border-dashed border-muted-foreground/30 p-4">
              <Plus size={24} className="text-muted-foreground/50" />
            </div>
            <p className="text-sm">Your query is empty. Add your first block below.</p>
          </div>
        ) : (
          <div className="flex min-h-[80px] flex-wrap items-center gap-2">
            {blocks.map((block) => (
              <QueryBlock
                key={block.id}
                block={block}
                onChange={updateBlock}
                onDelete={deleteBlock}
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-2">
        <AddBlockButton onAdd={addBlock} />
        {blocks.length > 0 && (
          <SaveDorkDialog blocks={blocks} query={query} />
        )}
      </div>

      <QueryPreview blocks={blocks} />
    </div>
  )
}
