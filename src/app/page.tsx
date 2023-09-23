import ListProducts from '@/components/products/ListProducts'
import { notFound } from 'next/navigation'

const getProduct = async () => {
  const response = await fetch(`http://localhost:3001/api/product`,  { next: { revalidate: 3600 } })
  if (!response.ok) {
    return notFound()
  }
  return response.json()
  // console.log(response)
}


export default async function Home() {
  const productData = await getProduct()
  return (
    <main className="">
      <ListProducts data= {productData} />
     
    </main>
  )
}
