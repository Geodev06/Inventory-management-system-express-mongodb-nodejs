const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Product name field is required.'],
        lowercase: true
    },
    supplier: {
        type: String,
        required: [true, 'Supplier field is required.'],
        lowercase: true
    },
    category: {
        type: String,
        required: [true, 'Category field is required.'],
        lowercase: true
    },
    stock: {
        type: Number,
        required: [true, 'Stock field is required.'],
        lowercase: true,
        default: 0
    },
    acquisition_price: {
        type: mongoose.Decimal128,
        required: [true, 'Acquisition price field is required.'],
        lowercase: true,
        default: 0
    },
    retail_price: {
        type: mongoose.Decimal128,
        required: [true, 'Retail price field is required.'],
        lowercase: true,
        default: 0
    }

}, { timestamps: true })

const Product = mongoose.model('product', productSchema)

module.exports = Product