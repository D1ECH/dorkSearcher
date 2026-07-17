import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Trash2,
  Calendar,
  FolderOpen,
  FileText,
  ExternalLink,
  Copy,
  Check,
  Filter,
  X,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getSavedDorks, deleteDork, getDorkCategories } from "@/lib/dorkStorage"
import type { SavedDork } from "@/data/types"

export default function Creations() {
  const navigate = useNavigate()
  const [dorks, setDorks] = useState<SavedDork[]>(() => getSavedDorks())
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = useMemo(() => getDorkCategories(), [dorks])

  const filteredDorks = useMemo(() => {
    return dorks.filter((dork) => {
      const matchesSearch =
        search === "" ||
        dork.name.toLowerCase().includes(search.toLowerCase()) ||
        dork.description.toLowerCase().includes(search.toLowerCase()) ||
        dork.query.toLowerCase().includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === "all" || dork.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [dorks, search, selectedCategory])

  function handleDelete(id: string) {
    deleteDork(id)
    setDorks(getSavedDorks())
    setDeleteId(null)
  }

  async function handleCopy(query: string, id: string) {
    try {
      await navigator.clipboard.writeText(query)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = query
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand("copy")
      document.body.removeChild(textarea)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  function handleSearchGoogle(query: string) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  function handleLoadInBuilder(dork: SavedDork) {
    // Store the dork blocks in sessionStorage to load in builder
    sessionStorage.setItem("dorksearch-load", JSON.stringify(dork.blocks))
    navigate("/builder")
  }

  function formatDate(iso: string): string {
    const d = new Date(iso)
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Saved Creations</h1>
        <p className="text-muted-foreground mt-1">
          {dorks.length} {dorks.length === 1 ? "dork" : "dorks"} saved
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, description or query..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      {filteredDorks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <FolderOpen size={48} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">No dorks found</p>
          <p className="text-sm mt-1">
            {dorks.length === 0
              ? "Start by creating and saving a dork in the Builder."
              : "Try adjusting your search or filters."}
          </p>
          {dorks.length === 0 && (
            <Button className="mt-4" onClick={() => navigate("/builder")}>
              <Wrench size={16} className="mr-2" />
              Go to Builder
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDorks.map((dork) => (
            <Card
              key={dork.id}
              className="group flex flex-col transition-all hover:shadow-md hover:border-primary/20"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base leading-tight line-clamp-2">
                    {dork.name}
                  </CardTitle>
                  <button
                    onClick={() => setDeleteId(dork.id)}
                    className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="secondary" className="text-xs">
                    {dork.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={10} />
                    {formatDate(dork.createdAt)}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1 space-y-3">
                {dork.description && (
                  <CardDescription className="line-clamp-2 text-xs">
                    {dork.description}
                  </CardDescription>
                )}
                <div className="rounded-md bg-muted p-2.5">
                  <p className="font-mono text-xs break-all line-clamp-2 text-muted-foreground">
                    {dork.query}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex gap-1.5 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => handleCopy(dork.query, dork.id)}
                >
                  {copiedId === dork.id ? (
                    <Check size={12} className="mr-1 text-emerald-500" />
                  ) : (
                    <Copy size={12} className="mr-1" />
                  )}
                  {copiedId === dork.id ? "Copied" : "Copy"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => handleSearchGoogle(dork.query)}
                >
                  <ExternalLink size={12} className="mr-1" />
                  Search
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs ml-auto"
                  onClick={() => handleLoadInBuilder(dork)}
                >
                  <Wrench size={12} className="mr-1" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this dork?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The dork will be permanently removed
              from your saved creations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
