import { ReactNode } from 'react'

// Define the props type for layout
interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Dashboard Header</h1>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-200 p-4">
          <nav>
            <ul>
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-4 hover:bg-gray-300"
                >
                  Dashboard Home
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/settings"
                  className="block py-2 px-4 hover:bg-gray-300"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/profile"
                  className="block py-2 px-4 hover:bg-gray-300"
                >
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 p-4">{children}</main>
      </div>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  )
}
