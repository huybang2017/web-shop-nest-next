import Banner from '@/components/banner'
import CategoryMenu from '@/components/category-menu'
import { getQueryClient } from '@/app/get-query-client'
import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from '@tanstack/react-query'
import Sale from '@/components/sale'
import Category from '@/components/category'
import { getProductCategory } from '@/lib/apis/endpoints/get-product-categories'
import { getProductPromotion } from '@/lib/apis/endpoints/get-product-promotion'

export default function Page() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    queryOptions({
      queryKey: [
        'fetchProductsPromotion',
        {
          category_name: null,
          parent_category_id: null,
          sortFeild: null,
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

  void queryClient.prefetchQuery(
    queryOptions({
      queryKey: ['fetchProductsPromotion'],
      queryFn: async () => {
        return await getProductPromotion()
      },
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <div className="grid grid-cols-10 mt-10">
          <div className="col-span-2">
            <CategoryMenu />
          </div>
          <div className="col-span-8">
            <Banner />
          </div>
        </div>
        <Sale />
        <Category />
      </div>
    </HydrationBoundary>
  )
}
