import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">

      <Header />

      <main className="container mx-auto w-full px-6 py-8">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}