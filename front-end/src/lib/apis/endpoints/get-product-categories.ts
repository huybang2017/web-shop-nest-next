import { apiClient } from '../client'
import { ProductCategoriesParamSchema } from '../schemas/get-product-categories-response-schema'
import { ProductCategoriesResponseSchema } from '../schemas/product-categories-response-scheme'
import { AxiosRequestConfig } from 'axios'

export async function getProductCategory(
  params: ProductCategoriesParamSchema,
  config?: AxiosRequestConfig<ProductCategoriesParamSchema>,
): Promise<ProductCategoriesResponseSchema | undefined> {
  try {
    const response = await apiClient.get<
      ProductCategoriesResponseSchema,
      ProductCategoriesParamSchema
    >('/category', params, {
      headers: {
        'Content-Type': 'application/json',
        'No-Auth': true,
      },
      ...config,
    })

    return response.data
  } catch (error) {
    console.error('Error fetching product categories:', error)
    return undefined
  }
}
