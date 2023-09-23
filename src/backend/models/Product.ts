import mongoose, {Schema, models, model} from 'mongoose'

const productSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Please enter Product name']
    },
    description:{
        type:String,
        required:[true, 'Please enter Product description']
    },
    price:{
        type:Number,
        required:[true, 'Please enter Product price']
    },
    images:[
        {
            public_id:{
                type: String
            },
            url:{
                type: String
            },
        }
    ],
    category:{
        type:String,
        required:[true, 'Please enter Product name'],
        enum:{
            values:[
                "Electronics",
                "cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Sports"
            ],
            message:"Please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true, 'Please enter Product seller']
    },
    stock:{
        type:Number,
        required:[true, 'Please enter Product stock']
    },
    ratings:{
        type:String,
        default:0
    },
    reviews:[
        {
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type:Number,
                required: true
            },
            createdAt:{
                type:Date,
                default:Date.now,
            },
        },
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product = models.Product || model("Product", productSchema)

export default Product