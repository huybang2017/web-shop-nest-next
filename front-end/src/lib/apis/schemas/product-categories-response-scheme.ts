import { z } from 'zod'
import { productCategoriesSchema } from './product-categories-schema'

export const productCategoriesResponseSchema = z.object({
  statusCode: z.coerce.number(),
  message: z.string(),
  data: z.array(z.lazy(() => productCategoriesSchema)),
})
export type ProductCategoriesResponseSchema = z.infer<
  typeof productCategoriesResponseSchema
>
