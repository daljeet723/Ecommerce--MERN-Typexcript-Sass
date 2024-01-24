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
        required: true
    },
    shippingCharges: {
        type: Number,
        required: true
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