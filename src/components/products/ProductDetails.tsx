"use client"
import { productEntity } from "@/type/type";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import BreadCrumbs from "../layout/BreadCrumbs";
import { usePathname } from "next/navigation";
import { useCartContext } from "@/context/CartContext";

const ProductDetails = ({ productId }: { productId: string }) => {
    const [data, setData] = useState<productEntity | null>(null)
    const pathname = usePathname()
    const {addToCart} = useCartContext()
    // console.log(pathname)
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`/api/product/${productId}`)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchDetails()
    }, [productId])

    const inStock = data && data?.stock >= 1
    const imgRef = useRef<HTMLImageElement | null>(null)

    const setImagePreview = (url: string) => {
        imgRef.current?.setAttribute("src", url);
    }
    const breadCrumbs = [
        {name : "Home", url: "/"},
        {name : `${data?.name?.substring(0, 300)}...`, url: `/products/${data?._id}`},
    ]
    return (
        <>
            <BreadCrumbs replacePath={pathname}  />
            <section className="bg-white py-10">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
                        <aside>
                            <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                                <Image
                                    ref={imgRef}
                                    className="object-cover inline-block"
                                    src={`${data && data.images[0] ? data.images[0].url : ""}`}
                                    alt={`/${data?.name}`}
                                    width={340}
                                    height={340}
                                />
                            </div>
                            <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                                {
                                    data && data?.images.map((img) => (

                                        <a key={img.public_id} onClick={() => setImagePreview(img.url)} className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer">
                                            <Image
                                                className="w-14 h-14"
                                                src={img.url}
                                                alt="Product title"
                                                width={500}
                                                height={500}
                                            />
                                        </a>
                                    ))
                                }
                            </div>
                        </aside>
                        <main>
                            <h2 className="font-semibold text-2xl mb-4">{data?.name}</h2>

                            <div className="flex flex-wrap items-center space-x-2 mb-2">
                                <div className="ratings">
                                    <StarRatings
                                        rating={Number(data && data?.ratings)}
                                        starRatedColor="#ffb829"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        name="rating"
                                    />
                                </div>
                                <span className="text-yellow-500">{data?.ratings}</span>

                                <svg
                                    width="6px"
                                    height="6px"
                                    viewBox="0 0 6 6"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                                </svg>

                                <span className="text-green-500">Verified</span>
                            </div>

                            <p className="mb-4 font-semibold text-xl">$ {data?.price}</p>

                            <p className="mb-4 text-gray-500">
                                {data?.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                <button onClick={()=>addToCart(data!, data?._id!)} className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                                    <i className="fa fa-shopping-cart mr-2"></i>
                                    Add to cart
                                </button>
                            </div>

                            <ul className="mb-5">
                                <li className="mb-1">
                                    {" "}
                                    <b className="font-medium w-36 inline-block">Stock:</b>
                                    {inStock ? (<span className="text-green-500">In Stock</span>) : <span className="text-red-500">Out of Stock</span>}
                                </li>
                                <li className="mb-1">
                                    {" "}
                                    <b className="font-medium w-36 inline-block">Category:</b>
                                    <span className="text-gray-500">{data?.category}</span>
                                </li>
                                <li className="mb-1">
                                    {" "}
                                    <b className="font-medium w-36 inline-block">
                                        Seller / Brand:
                                    </b>
                                    <span className="text-gray-500">{data?.seller}</span>
                                </li>
                            </ul>
                        </main>
                    </div>

                    {/* <NewReview /> */}
                    <hr />

                    <div className="font-semibold">
                        <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
                            Other Customers Reviews
                        </h1>
                        {/* <Reviews /> */}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetails;