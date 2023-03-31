const mongoose = require('mongoose')


const releaseSchema = new mongoose.Schema({

    customer_name: {
        type: String,
        required: [true, 'Customer name field is required.'],
        lowercase: true
    },
    items: {
        type: Array,
        required: [true, 'Items field is required.'],
        lowercase: true
    },
    no_of_items: {
        type: Number,
        required: [true, 'No_of_items name field is required.'],
        lowercase: true
    },
    total_amount: {
        type: mongoose.Decimal128,
        required: [true, 'Amount name field is required.'],
        lowercase: true
    },
    status: {
        type: Number,
        required: [true, 'Status field is required.'],
        lowercase: true
    },
    releasedAt: {
        type: mongoose.Mixed,
        default: null
    }
}, { timestamps: true })

const Release = mongoose.model('release', releaseSchema)

module.exports = Release