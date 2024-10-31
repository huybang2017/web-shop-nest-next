'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

const Products = () => {
  // const { data: products } = useSuspenseQuery(fetchProducts)
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-4 h-8 bg-red-600 mr-2 rounded-sm"></div>
        <h1 className="text-xl font-bold text-red-600">Products</h1>
      </div>
      <div>
        {/* {products.data.length === 0 ? ( */}
        {/*   <p>No products available</p> */}
        {/* ) : ( */}
        {/*   <ul> */}
        {/*     {products?.data?.map((product: Product) => ( */}
        {/*       <li key={product.id} className="mb-2"> */}
        {/*         {product.name} */}
        {/*       </li> */}
        {/*     ))} */}
        {/*   </ul> */}
        {/* )} */}
      </div>
    </div>
  )
}

export default Products
