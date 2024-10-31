import { ProductCategoriesParams } from './product-categories-params-schema'
import { ProductCategoriesResponseSchema } from './product-categories-response-scheme'
import { ValidationErrorResponseSchema } from './validate-error-response-schema'

export type GetProductCategoriesResponseSchema = ProductCategoriesResponseSchema
export type GetProductCategoriesErrorResponseSchema =
  ValidationErrorResponseSchema
export type ProductCategoriesParamSchema = ProductCategoriesParams
