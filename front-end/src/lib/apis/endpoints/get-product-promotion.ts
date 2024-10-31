import { apiClient } from '../client'
import { ProductPromotionResponseSchema } from '../schemas/get-product-promotions-schema'

export async function getProductPromotion(): Promise<
  ProductPromotionResponseSchema | undefined
> {
  try {
    const response = await apiClient.get<ProductPromotionResponseSchema>(
      '/products/promotions',
      {
        headers: {
          'Content-Type': 'application/json',
          'No-Auth': true,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error fetching product promotion:', error)
    return undefined
  }
}
