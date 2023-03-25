const User = require('../models/User')
const jwt = require('jsonwebtoken')
/**
 * resource functions 
 * store - store data, update - update data, destroy - delete data
 * @param {*} req 
 * @param {*} res 
 */

const handleErrors = (err) => {

    let errors = { name: '', email: '', password: '' }

    // duplicate error
    if (err.code === 11000) {
        errors.email = 'The email is already taken'
        return errors
    }
    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, 'userToken', {
        expiresIn: maxAge
    })
}
// store new user
const store = async (req, res) => {

    const { name, email, password } = req.body

    try {
        const user = await User.create({ name, email, password })

        //set cookie as a logged in user
        res.cookie('jwt', createToken(user._id), {
            httpOnly: true,
            maxAge: maxAge * 1000
        })

        res.status(201)
            .json({ user: user._id })
    }
    catch (err) {
        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }

}

const update = (req, res) => {

}

const destroy = (req, res) => {

}


module.exports = {
    store,
    update,
    destroy
}