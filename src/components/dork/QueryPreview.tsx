import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { operators } from "@/data/operators";
import type { QueryBlock } from "@/data/types";

interface QueryPreviewProps {
  blocks: QueryBlock[];
}

export default function QueryPreview({ blocks }: QueryPreviewProps) {
  const [copied, setCopied] = useState(false);

  const query = blocks
    .filter((block) => block.value.trim() !== "")
    .map((block) => {
      const operator = operators.find((op) => op.id === block.operator);
      if (!operator) return block.value;

      const trimmedValue = block.value.trim();

      switch (operator.type) {
        case "prefix":
          return `${operator.syntax}${trimmedValue}`;
        case "separator":
          return ` ${operator.syntax.trim()} ${trimmedValue}`;
        case "modifier":
          return `${operator.syntax}${trimmedValue}`;
        case "logical":
          return `${operator.syntax}${trimmedValue}`;
        default:
          return `${operator.syntax}${trimmedValue}`;
      }
    })
    .join(" ");

  async function handleCopy() {
    if (!query) return;
    try {
      await navigator.clipboard.writeText(query);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = query;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  function handleSearch() {
    if (!query) return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Generated Query</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!query}
          >
            {copied ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleSearch}
            disabled={!query}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Search Google
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-muted p-4 font-mono min-h-[3.5rem] flex items-center overflow-x-auto">
        {query ? (
          <span className="whitespace-nowrap">{query}</span>
        ) : (
          <span className="text-muted-foreground italic">
            Add blocks and fill values to generate your dork...
          </span>
        )}
      </div>
    </div>
  );
}
