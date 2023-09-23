import ListProducts from '@/components/products/ListProducts'
import { notFound } from 'next/navigation'

let base_url:string;
if (process.env.NODE_ENV === 'development') {
  base_url = 'http://localhost:3001'
} else {
  base_url = 'https://full-commerce-mu.vercel.app'
}
const getProduct = async () => {
  const response = await fetch(`${base_url}/api/product`,  { next: { revalidate: 3600 } })
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
