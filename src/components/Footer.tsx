// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12 border-t">
      <div className="container mx-auto text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Steve's Payload Sandbox. All rights reserved.
      </div>
    </footer>
  )
}
