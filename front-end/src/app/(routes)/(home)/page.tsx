import Banner from '@/components/banner'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
}
export default function Page() {
  return (
    <>
      <Banner />
    </>
  )
}
