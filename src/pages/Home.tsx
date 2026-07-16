import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">

      <h1 className="text-6xl font-bold">
        DorkSearch
      </h1>

      <p className="mt-4 text-muted-foreground">
        Build advanced Google Dorks visually.
      </p>

      <Button className="mt-8">
        <Link to="/builder">
          Start Building
        </Link>
      </Button>

    </div>
  )
}