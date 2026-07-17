import { useState } from "react"
import { Save, Tag, FileText, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { saveDork, getDorkCategories } from "@/lib/dorkStorage"
import type { QueryBlock } from "@/data/types"

interface SaveDorkDialogProps {
  blocks: QueryBlock[]
  query: string
  onSaved?: () => void
}

export default function SaveDorkDialog({
  blocks,
  query,
  onSaved,
}: SaveDorkDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [isNewCategory, setIsNewCategory] = useState(false)

  const existingCategories = getDorkCategories()

  function handleSave() {
    const finalCategory = isNewCategory ? newCategory.trim() : category
    if (!name.trim() || !finalCategory) return

    const dork = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      category: finalCategory,
      query,
      blocks: [...blocks],
      createdAt: new Date().toISOString(),
    }

    saveDork(dork)
    setOpen(false)
    setName("")
    setDescription("")
    setCategory("")
    setNewCategory("")
    setIsNewCategory(false)
    onSaved?.()
  }

  const canSave = name.trim() && (isNewCategory ? newCategory.trim() : category)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Save size={14} />
          Save Dork
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Dork</DialogTitle>
          <DialogDescription>
            Save this query to your creations for later use.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="flex items-center gap-1.5">
              <Tag size={12} />
              Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. Admin Panel Finder"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5">
              <Folder size={12} />
              Category
            </Label>
            {!isNewCategory ? (
              <Select value={category} onValueChange={(value) => value && setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or create category..." />
                </SelectTrigger>
                <SelectContent>
                  {existingCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="__new__">+ Create new category</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="New category name..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsNewCategory(false)
                    setNewCategory("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
            {category === "__new__" && !isNewCategory && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-1"
                onClick={() => {
                  setIsNewCategory(true)
                  setCategory("")
                }}
              >
                Create new category
              </Button>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="description" className="flex items-center gap-1.5">
              <FileText size={12} />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="What does this dork do? When should you use it?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Preview */}
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Query preview</p>
            <p className="font-mono text-xs break-all">{query || "No query generated yet"}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave}>
            <Save size={14} className="mr-1.5" />
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
