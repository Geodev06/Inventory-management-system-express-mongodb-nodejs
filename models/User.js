const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bycrypt = require('bcrypt')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name field is required.'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email field is required.'],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password field is required.'],
        minlength: [6, 'Minimum password length is 6 characters.']
    }
})

// fire a function to hash the password using bycrypt
userSchema.pre('save', async function (next) {
    const salt = await bycrypt.genSalt()
    this.password = await bycrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email })

    if (user) {

        const auth = await bycrypt.compare(password, user.password)

        if (auth) {

            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}


const User = mongoose.model('user', userSchema)

module.exports = User