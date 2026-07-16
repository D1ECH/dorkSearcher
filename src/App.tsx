import { Route, Routes } from "react-router-dom"

import Layout from "@/components/layout/Layout"

import Home from "@/pages/Home"
import Builder from "@/pages/Builder"
import Creations from "@/pages/Creations"

export default function App() {
  return (
    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/builder"
          element={<Builder />}
        />

        <Route
          path="/creations"
          element={<Creations />}
        />

      </Route>

    </Routes>
  )
}