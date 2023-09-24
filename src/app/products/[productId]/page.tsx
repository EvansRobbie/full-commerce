import ProductDetails from '@/components/products/ProductDetails'
import React from 'react'

const ProductId = ({ params: { productId } }: { params: { productId: string } }) => {
  return (
    <ProductDetails productId={productId} />
  )
}

export default ProductId