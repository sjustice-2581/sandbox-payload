// src/components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-100 py-4 px-6 border-b">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-gray-800">
          Steve's Payload Sandbox
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About
          </Link>
        </div>
      </nav>
    </header>
  )
}
