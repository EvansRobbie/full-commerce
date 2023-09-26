import { useCartContext } from '@/context/CartContext'
import { productEntity } from '@/type/type'
import Image from 'next/image'
import React from 'react'

interface productProps{
    products:productEntity[]
}

const CartItems = ({products}:productProps) => {
    const {increaseQuantity, decreaseQuantity} = useCartContext()
    // console.log(products)
  return (
   <>
    <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
        {products.map((product)=>(

        <div key={ product._id}>
            <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
            <div className="w-full lg:w-2/5 xl:w-2/4">
                <figure className="flex leading-5">
                <div>
                    <div className="relative block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                    <Image src={`${product && product.images[0] ? product.images[0].url : ''}`} fill priority alt="Title" />
                    </div>
                </div>
                <figcaption className="ml-3">
                    <p>
                    <a href="#" className="hover:text-blue-600">
                        {product.name}
                    </a>
                    </p>
                    <p className="mt-1 text-gray-400"> Seller: {product.seller}</p>
                </figcaption>
                </figure>
            </div>
            <div className="w-24">
                <div className="flex  h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button
                    onClick={()=>decreaseQuantity(product._id)}
                    data-action="decrement"
                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                >
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <span className='focus:outline-none  justify-center text-center border w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default  inline-flex items-center text-gray-900  outline-none custom-input-number'>
                    {product.qty}
                </span>
                <button
                onClick={()=>increaseQuantity(product._id)}
                    data-action="increment"
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                >
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
                </div>
            </div>
            <div>
                <div className="leading-5">
                <p className="font-semibold not-italic">$898</p>
                <small className="text-gray-400">
                    {" "}
                    $98 / per item{" "}
                </small>
                </div>
            </div>
            <div className="flex-auto">
                <div className="float-right">
                <a className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                    Remove
                </a>
                </div>
            </div>
            </div>

            <hr className="my-4" />
        </div>
        ))}
    </article>
   </>
  )
}

export default CartItems