import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Prisma Crud',
  description: 'Crud de Usuarios/Personas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className="container mx-auto h-[calc(100vh-1)] flex justify-center items-center">{children}</main></body>
    </html>
  )
}
