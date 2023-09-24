import { dbConnect } from "@/backend/config/dbConnect"
import Product from "@/backend/models/Product"
import { NextResponse } from "next/server"

export const GET = async (req: Request, { params: { productId } }: { params: { productId: string } }) => {
    await dbConnect()
    try {
        const newProduct = await Product.findById({ _id: productId })
        return NextResponse.json(newProduct, { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse('Failed to create Product', { status: 400 })
    }
}