import Footer from '@/components/footer'
import Header from '@/components/header'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="container mx-auto">
        <Header />
        {children}
        <Footer />
      </main>
    </>
  )
}
