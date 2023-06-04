import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@components/Navbar'
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Digital Travels',
  description: 'Aplicacion de reserva de vuelos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar /> 
        {children} 
        <Footer />
      </body>
    </html>
  )
}
