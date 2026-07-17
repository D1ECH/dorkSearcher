import { Plus, Search, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { operators } from "@/data/operators"

export default function AddBlockButton({
  onAdd,
}: {
  onAdd: (operator: string) => void
}) {
  // Group operators by category
  const categories = [...new Set(operators.map((op) => op.category))];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Plus size={14} />
          Add operator
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="center">
        <Command>
          <CommandInput placeholder="Search operator..." />
          <CommandList className="max-h-[320px]">
            <CommandEmpty>No operator found</CommandEmpty>
            {categories.map((category, idx) => (
              <div key={category}>
                <CommandGroup heading={category}>
                  {operators
                    .filter((op) => op.category === category)
                    .map((operator) => (
                      <CommandItem
                        key={operator.id}
                        onSelect={() => onAdd(operator.id)}
                        className="cursor-pointer flex-col items-start gap-0.5 py-2"
                      >
                        <div className="flex items-center w-full">
                          <Search size={12} className="mr-2 text-muted-foreground shrink-0" />
                          <span className="font-mono text-sm font-medium">{operator.syntax}</span>
                          <span className="ml-2 text-xs text-muted-foreground truncate">
                            {operator.label}
                          </span>
                        </div>
                        {operator.description && (
                          <span className="text-[11px] text-muted-foreground/70 pl-5 leading-tight">
                            {operator.description}
                          </span>
                        )}
                      </CommandItem>
                    ))}
                </CommandGroup>
                {idx < categories.length - 1 && <CommandSeparator />}
              </div>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
