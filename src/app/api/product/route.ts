import { dbConnect } from "@/backend/config/dbConnect"
import Product from "@/backend/models/Product"
import APIFilters from "@/utils/APIFilters"
import { NextRequest, NextResponse } from "next/server"

interface CustomRequest extends NextRequest {
    query?: {
        keyword?: string,
        category?: string,
        price?: {
            lte?: number,
            gte?: number
        }
        page?:number | null
    }
}


export const POST = async (req: Request) => {
    const data = await req.json()
    await dbConnect()
    try {
        const newProduct = await Product.create(data)
        return NextResponse.json(newProduct, { status: 201 })

    } catch (error: any) {
        return new NextResponse(error._message, { status: 400 })
    }
}

export const GET = async (req: CustomRequest) => {
    const { searchParams } = new URL(req.url)
    const keyword: any = searchParams.get('keyword')
    const category: any = searchParams.get('category')
    const minPrice: any = searchParams.get('price[lte]')
    const maxPrice: any = searchParams.get('price[gte]')
    const page: any = searchParams.get('page')
    // console.log(page)
    const pricesValid =
        maxPrice &&
        minPrice &&
        !isNaN(parseInt(maxPrice)) &&
        !isNaN(parseInt(minPrice));

    
    await dbConnect()
    try {
        const resPerPage = 3;
        const productsCount = await Product.countDocuments();

        let apiFilter = new APIFilters(Product.find(), {})
        if (keyword) {
            apiFilter = new APIFilters(Product.find(), { keyword }).search();
        }
        if (category) {
            apiFilter = new APIFilters(Product.find(), { category }).filter();
        }
        if (pricesValid) {
            apiFilter = new APIFilters(Product.find(), { price: { gte: maxPrice, lte: minPrice } }).filter();
        }
        // if (pricesValid && category) {
        //     apiFilter = new APIFilters(Product.find(), {category, price: { gte: maxPrice, lte: minPrice }}).filter();
        // }
        let products = await apiFilter?.query
        const filterdProductsCount = products.length
        apiFilter.pagination(resPerPage, page)
        products = await apiFilter?.query.clone()
        // console.log(products)
        return NextResponse.json({productsCount, resPerPage, filterdProductsCount,products}, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse('Failed to fetch product', { status: 400 })
    }
}
