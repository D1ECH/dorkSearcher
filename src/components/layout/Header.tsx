import { Link } from "react-router-dom"

import { ModeToggle } from "@/components/theme/ModeToggle"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto grid h-16 grid-cols-3 items-center px-6">

        {/* Logo */}
        <div className="justify-self-start">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            DorkSearch
          </Link>
        </div>

        {/* Menú */}
        <NavigationMenu className="justify-self-center">
          <NavigationMenuList>

            <NavigationMenuItem>
              <NavigationMenuLink >
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink >
                <Link to="/builder">Dork Creator</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink >
                <Link to="/creations">Creations</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* Tema */}
        <div className="justify-self-end">
          <ModeToggle />
        </div>

      </div>
    </header>
  )
}