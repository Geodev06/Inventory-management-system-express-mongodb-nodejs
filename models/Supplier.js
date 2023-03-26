const mongoose = require('mongoose')


const supplierSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name field is required.'],
        lowercase: true
    },
    contact: {
        type: String,
        required: [true, 'Contact field is required.'],
        lowercase: true,
    },
    address: {
        type: String,
        required: [true, 'Address field is required.'],
        lowercase: true,
    }
}, { timestamps: true })

const Supplier = mongoose.model('supplier', supplierSchema)

module.exports = Supplier