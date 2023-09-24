import { dbConnect } from "@/backend/config/dbConnect"
import Product from "@/backend/models/Product"
import APIFilters from "@/utils/APIFilters"
import { NextRequest, NextResponse } from "next/server"

interface CustomRequest extends NextRequest {
    query: {
        keyword:any
    }
}
export const POST = async (req: Request) => {
    const data = await req.json()
    await dbConnect()
    try {
        const newProduct = await Product.create(data)
        return NextResponse.json(newProduct, { status: 201 })

    } catch (error) {
        console.log(error)
        return new NextResponse('Failed to create Product', { status: 400 })
    }
}

export const GET = async (req: CustomRequest) => {
    const {searchParams} = new URL(req.url)
    const keyword = searchParams.get('keyword')
    
    await dbConnect()
    try {
        const apiFilter = new APIFilters(Product.find(), {keyword}).search()
        const newProduct = await apiFilter.query
        return NextResponse.json(newProduct, { status: 200 })
    } catch (error) {
        console.log(error)
        return new NextResponse('Failed to fetch product', { status: 400 })
    }
}
