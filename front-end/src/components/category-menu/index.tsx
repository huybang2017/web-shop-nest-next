'use client'

import { getProductCategory } from '@/lib/apis/endpoints/get-product-categories'
import { ProductCategoriesSchema } from '@/lib/apis/schemas/product-categories-schema'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

const CategoryMenu = () => {
  const { data: resProductCategories } = useSuspenseQuery(
    queryOptions({
      queryKey: [
        'fetchProductsPromotion',
        {
          category_name: null,
          parent_category_id: null,
          sortField: null, // Fixed spelling error
          sortOrder: null,
          page: null,
          limit: null,
        },
      ],
      queryFn: async () => {
        return await getProductCategory({
          category_name: null,
          parent_category_id: null,
          sortField: null, // Ensure consistent naming
          sortOrder: null,
          page: null,
          limit: null,
        })
      },
    }),
  )

  const itemClasses = {
    base: 'py-0 w-full',
    title: 'font-normal text-medium',
    trigger: 'py-0 pt-4 flex items-center',
    indicator: 'text-medium',
    content: 'text-small px-2',
  }

  return (
    <div>
      <ul className="space-y-4">
        <Accordion showDivider={false} itemClasses={itemClasses}>
          {resProductCategories?.data ? (
            resProductCategories.data.map(
              (category: ProductCategoriesSchema) => {
                return (
                  <AccordionItem
                    key={category.id}
                    aria-label={`Accordion ${category.id}`}
                    title={category.parent_category_id.category_name}
                  >
                    <span>{category.category_name}</span>
                  </AccordionItem>
                )
              },
            )
          ) : (
            <li className="px-2">No categories available</li> // Handle empty state
          )}
        </Accordion>
      </ul>
    </div>
  )
}

export default CategoryMenu
