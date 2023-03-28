const mongoose = require('mongoose')
const { isEmail } = require('validator')

const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name field is required.'],
        lowercase: true
    },
    contact: {
        type: String,
        required: [true, 'Contact field is required.'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email field is required.'],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    address: {
        type: String,
        required: [true, 'Address field is required.'],
        lowercase: true
    }

}, { timestamps: true })

const Customer = mongoose.model('customer', customerSchema)

module.exports = Customer