import { z } from 'zod'

export const FilterDtoSchema = z.object({
  category_name: z.string().optional().nullable(),
  parent_category_id: z.number().optional().nullable(),
})

export const SortDtoSchema = z.object({
  sortField: z.string().optional().nullable(),
  sortOrder: z.enum(['ASC', 'DESC']).optional().nullable(),
})

export const PaginationDtoSchema = z.object({
  page: z.number().int().min(1).default(1).nullable(),
  limit: z
    .union([z.number().int().min(1), z.literal('full')])
    .default(10)
    .nullable(),
})

// Types inferred from schemas
export type FilterDto = z.infer<typeof FilterDtoSchema>
export type SortDto = z.infer<typeof SortDtoSchema>
export type PaginationDto = z.infer<typeof PaginationDtoSchema>

export const ProductCategoriesParams = z.object({
  ...FilterDtoSchema.shape,
  ...SortDtoSchema.shape,
  ...PaginationDtoSchema.shape,
})

export type ProductCategoriesParams = z.infer<typeof ProductCategoriesParams>
