import { z } from 'zod'

export const promotionCategoriesSchema = z.object({
  category_id: z.number(),
  promotion_id: z.number(),
})

export type PromotionCategoriesSchema = z.infer<
  typeof promotionCategoriesSchema
>
