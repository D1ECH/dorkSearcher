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
} from "@/components/ui/command"

import { operators } from "@/data/operators"


export default function AddBlockButton({
  onAdd
}: {
  onAdd: (operator: string) => void
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          + Añadir bloque
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="center">
        <Command>
          <CommandInput placeholder="Buscar operador..." />
          <CommandList>
            <CommandEmpty>
              No operator found
            </CommandEmpty>
            <CommandGroup>
              {
                operators.map((operator) => (
                  <CommandItem key={operator.id} onSelect={() => onAdd(operator.id)}>
                    {operator.syntax}
                    <span className="ml-2 text-muted-foreground">
                      {operator.label}
                    </span>
                  </CommandItem>
                ))
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}