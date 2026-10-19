import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const Layout = () => (
  <div className="flex min-h-screen flex-col bg-transparent">
    <Navbar />
    <main className="app-shell flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
)
