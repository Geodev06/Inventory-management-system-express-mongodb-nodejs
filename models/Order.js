const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({

    product_id: {
        type: String,
        required: [true, 'Product id field is required.'],
        lowercase: true
    },
    product: {
        type: String,
        required: [true, 'Product name field is required.'],
        lowercase: true
    },
    category: {
        type: String,
        required: [true, 'Category  field is required.'],
        lowercase: true
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity field is required.'],
        lowercase: true,
        default: 0
    },
    amount: {
        type: mongoose.Decimal128,
        required: [true, 'Amount field is required.'],
        lowercase: true,
        default: 0
    },
    supplier_id: {
        type: String,
        required: [true, 'Supplier field is required.'],
        lowercase: true,
        default: 0
    }

}, { timestamps: true })

const Order = mongoose.model('order', orderSchema)

module.exports = Order