import { dbConnect } from "@/backend/config/dbConnect"
import Product from "@/backend/models/Product"
import { NextResponse } from "next/server"

export const POST = async (req:Request) =>{
    const data = await req.json()
    await dbConnect()
    try {
        const newProduct = await Product.create(data)
        return NextResponse.json(newProduct, {status:201})

    } catch (error) {
        console.log(error)
        return new NextResponse('Failed to create Product', {status:400})
    }
}

export const GET = async (req:Request) =>{
    await dbConnect()
    try {
        const newProduct = await Product.find()
        return NextResponse.json(newProduct, {status:200})

    } catch (error) {
        console.log(error)
        return new NextResponse('Failed to create Product', {status:400})
    }
}

