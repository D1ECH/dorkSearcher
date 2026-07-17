import type { SavedDork } from "@/data/types"

const STORAGE_KEY = "dorksearch-saved"

export function getSavedDorks(): SavedDork[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as SavedDork[]
  } catch {
    return []
  }
}

export function saveDork(dork: SavedDork): void {
  const existing = getSavedDorks()
  const updated = [dork, ...existing]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function deleteDork(id: string): void {
  const existing = getSavedDorks()
  const updated = existing.filter((d) => d.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function updateDork(updatedDork: SavedDork): void {
  const existing = getSavedDorks()
  const updated = existing.map((d) =>
    d.id === updatedDork.id ? updatedDork : d
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
}

export function getDorkCategories(): string[] {
  const dorks = getSavedDorks()
  const cats = [...new Set(dorks.map((d) => d.category))]
  return cats.filter(Boolean).sort()
}
