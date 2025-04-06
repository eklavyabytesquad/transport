'use client'

import { AuthProvider } from './utils/authcontext'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SS TRANSPORT</title>
        <meta name="description" content="SS TRANSPORT Management System" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}