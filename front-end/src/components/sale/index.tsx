'use client'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import ProductCard from '../card-product'
import { useRef } from 'react'
import Link from 'next/link'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { ProductSchema } from '@/lib/apis/schemas/get-product-promotions-schema'
import { getProductPromotion } from '@/lib/apis/endpoints/get-product-promotion'

const Sale = () => {
  const { data: resProductsPromotion } = useSuspenseQuery(
    queryOptions({
      queryKey: ['fetchProductsPromotion'],
      queryFn: async () => {
        return await getProductPromotion()
      },
    }),
  )
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 100
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 100
    }
  }

  return (
    <div className="py-36">
      <div className="flex items-center">
        <div className="w-4 h-8 bg-red-600 mr-2 rounded-sm"></div>
        <h1 className="text-xl font-bold text-red-600">Today's</h1>
      </div>
      <div className="flex justify-between items-center my-5">
        <div className="flex justify-between items-center gap-20">
          <span className="font-bold text-4xl">Flash Sales</span>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm font-normal text-gray-900 text-center">
                Days
              </p>
              <h3 className="font-semibold text-2xl text-black text-center">
                30
              </h3>
            </div>
            <div>
              <p className="text-sm font-normal text-gray-900 text-center">
                Hours
              </p>
              <h3 className="font-semibold text-2xl text-black text-center">
                30
              </h3>
            </div>
            <div>
              <p className="text-sm font-normal text-gray-900 text-center">
                Minutes
              </p>
              <h3 className="font-semibold text-2xl text-black text-center">
                30
              </h3>
            </div>
            <div>
              <p className="text-sm font-normal text-gray-900 text-center">
                Seconds
              </p>
              <h3 className="font-semibold text-2xl text-black text-center">
                30
              </h3>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-200"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={scrollRight}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-200"
          >
            <GrLinkNext />
          </button>
        </div>
      </div>
      <div
        className="overflow-x-auto scrollbar-hide"
        ref={scrollRef}
        style={{ width: '100%', overflowX: 'auto' }}
      >
        <div className="flex gap-10 my-5" style={{ width: 'max-content' }}>
          {resProductsPromotion?.data ? (
            resProductsPromotion.data.map((product: ProductSchema) => (
              <div key={product.id} className="inline-block">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <Link
          href={`/products`}
          className="bg-red-500 text-white px-7 py-3 rounded-md font-bold hover:bg-red-400"
        >
          Views all product
        </Link>
      </div>
    </div>
  )
}
export default Sale
