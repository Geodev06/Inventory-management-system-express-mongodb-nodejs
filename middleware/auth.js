const jwt = require('jsonwebtoken')

const User = require('../models/User')

const auth = (req, res, next) => {

    const token = req.cookies.jwt

    // check if token exsist
    if (token) {
        // verify token
        jwt.verify(token, 'userToken', (err, decodedToken) => {

            if (err) {
                res.redirect('/')
            }
            else {
                next()
            }
        })

    } else {
        res.redirect('/')
    }
}

// check current user

const checkUser = (req, res, next) => {

    const token = req.cookies.jwt

    // check if token exsist
    if (token) {
        // verify token
        jwt.verify(token, 'userToken', async (err, decodedToken) => {

            if (err) {
                res.locals.user = null
                next()
            }
            else {

                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }
    else {
        res.locals.user = null
        next()
    }
}

module.exports = {
    auth,
    checkUser
}