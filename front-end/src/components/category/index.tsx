'use client'
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr'
import CardCategory from '../card-category'
import { useRef } from 'react'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { getProductCategory } from '@/lib/apis/endpoints/get-product-categories'

const Category = () => {
  const { data: resProductCategories } = useSuspenseQuery(
    queryOptions({
      queryKey: [
        'fetchProductsPromotion',
        {
          category_name: null,
          parent_category_id: null,
          sortField: null,
          sortOrder: null,
          page: null,
          limit: null,
        },
      ],
      queryFn: async () => {
        return await getProductCategory({
          category_name: null,
          parent_category_id: null,
          sortField: null,
          sortOrder: null,
          page: null,
          limit: null,
        })
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
    <>
      <div className="pb-36">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-600 mr-2 rounded-sm"></div>
          <h1 className="text-xl font-bold text-red-600">Categories</h1>
        </div>
        <div className="flex justify-between items-center my-5">
          <div className="flex justify-between items-center gap-20">
            <span className="font-bold text-4xl">Browse By Category</span>
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
          <div className="flex gap-10 my-10" style={{ width: 'max-content' }}>
            {resProductCategories?.data ? (
              resProductCategories.data.map((category) => (
                <div key={category.id} className="inline-block">
                  <CardCategory category={category} />
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Category
