import { z } from 'zod'
import { promotionCategoriesSchema } from './promtion-categories-schema'

export const productCategoriesSchema = z.object({
  id: z.number(),
  category_name: z.string(),
  parent_category_id: z.object({
    id: z.number(),
    category_name: z.string(),
  }),
  promotionCategories: z.lazy(() => z.array(promotionCategoriesSchema)),
})
export type ProductCategoriesSchema = z.infer<typeof productCategoriesSchema>
