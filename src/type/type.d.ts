export interface productEntity {
        _id:string;
        name: string,
        description: string,
        price: number,
        category: string,
        seller: string,
        stock: number,
        ratings: string,
        images: {
            public_id:string
            url:string
        }[],
        reviews: string[],
        qty?:number
        createdAt: Date
}