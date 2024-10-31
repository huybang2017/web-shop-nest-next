import Footer from '@/components/footer'
import Header from '@/components/header'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>
        <div className="container mx-auto">
          <Header />
          <div className="grid grid-cols-10 my-16">
            <div className="col-span-6">
              <img
                src="/images/banner-auth.png"
                alt="banner-auth"
                className="object-center h-full w-full"
              />
            </div>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
