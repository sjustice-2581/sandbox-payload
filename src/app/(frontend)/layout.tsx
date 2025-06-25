// src/app/(frontend)/layout.tsx
import React from 'react'
import Link from 'next/link'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="p-6 bg-gray-900 text-white">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              MySite
            </Link>
            <div className="space-x-4">
              <Link href="/about">About</Link>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">{children}</main>

        <footer className="mt-16 bg-gray-100 py-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} MySite. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
