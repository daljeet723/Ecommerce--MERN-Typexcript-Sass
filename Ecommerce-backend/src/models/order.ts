import mongoose, { Mongoose } from "mongoose";

const schema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please enter your address"]
        },
        city: {
            type: String,
            required: [true, "Please enter city"]
        },
        state: {
            type: String,
            required: [true, "Please enter state"]
        },
        country: {
            type: String,
            required: [true, "Please enter country"]
        },
        pinCode: {
            type: Number,
            required: [true, "Please enter pin-code"]
        },
    },
    user: {
        type: String,
        ref: "User",
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default:0
    },
    shippingCharges: {
        type: Number,
        required: true,
        default:0
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"],
        default: "Processing"
    },
    orderItems: [
        {
            name: String,
            photo: String,
            price: Number,
            quantity: Number,
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            }

        }
    ]

}, {
    timestamps: true
});

export const Order = mongoose.model("Order", schema);


// SAMPLE POSTMAN REQUEST
// {
//     "shippingInfo":{
//         "address":"123 Kashmir Avenue",
//         "city":"Mumbai",
//         "state":"Maharashtra",
//         "country":"India",
//         "pinCode":"1234"
//     },
//     "orderItems":[
//         {
//      "name": "MacBook",
//     "price": 92890,
//     "photo": "uploads\\dca59fd0-d721-4463-87af-86beb6dd3902.jpg",
//     "quantity": 4,
//     "productId": "65a940d5bf7d614d52736fec"
//     }
//     ],
//     "user":"sampleId101",
//     "subTotal": 1250,
//     "tax": 50,
//     "discount": 200,
//     "shippingCharges": 40,
//     "total": 1140

// }