import ListProducts from '@/components/products/ListProducts'
import { notFound } from 'next/navigation'
import queryString from 'query-string';

let base_url:string;
if (process.env.NODE_ENV === 'development') {
  base_url = 'http://localhost:3000'
} else {
  base_url = 'https://full-commerce-mu.vercel.app'
}
const getProduct = async ({keyword, page, category, ratings, min, max}:{keyword:string, page:string, category:string, ratings:string, min:string, max:string}) => {

  const urlParams = {
    keyword,
    page,
    category,
    'ratings[gte]':ratings,
    'price[gte]':min,
    'price[lte]':max,
  }

  const searchQuery = queryString.stringify(urlParams)
  // console.log(searchQuery)
  const response = await fetch(`${base_url}/api/product?${searchQuery}`,  { next: { revalidate: 3600 } })
  if (!response.ok) {
    return notFound()
  }
  return response.json()
  // console.log(response)
}


export default async function Home({searchParams:{keyword, page, category, ratings, min, max}}:{searchParams:{keyword:string, page:string, category:string, ratings:string, min:string, max:string}}) {
  const productData = await getProduct({keyword, page, category, ratings, min, max})
  return (
    <main className="">
      <ListProducts data= {productData} />
     
    </main>
  )
}
