import Banner from '@/components/banner'
import Category from '@/components/category'
import Sale from '@/components/sale'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}
export default function Page() {
  return (
    <>
      <div>
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-2">
            <Category />
          </div>
          <div className="col-span-8">
            <Banner />
          </div>
        </div>
        <Sale />
      </div>
    </>
  )
}
