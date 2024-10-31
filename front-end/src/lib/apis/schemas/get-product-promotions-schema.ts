import { z } from 'zod'

const ProductItemSchema = z.object({
  id: z.number(),
  SKU: z.string(),
  qty_in_stock: z.number(),
  price: z.string(),
  product_image: z.string(),
})

const CategorySchema = z.object({
  id: z.number(),
  category_name: z.string(),
})

const PromotionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  discount_rate: z.string(),
  start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid start date',
  }),
  end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid end date',
  }),
})

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  product_image: z.string(),
  category: CategorySchema,
  productItems: z.array(ProductItemSchema),
  promotion: PromotionSchema,
})

const ProductPromotionResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.array(ProductSchema),
})

export type ProductPromotionResponseSchema = z.infer<
  typeof ProductPromotionResponseSchema
>

export type ProductSchema = z.infer<typeof ProductSchema>
