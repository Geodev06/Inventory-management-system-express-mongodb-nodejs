const Supplier = require('../models/Supplier')

const jwt = require('jsonwebtoken')

/**
 * resource functions 
 * store - store data, update - update data, destroy - delete data
 * @param {*} req 
 * @param {*} res 
 */

const handleErrors = (err) => {

    let errors = { name: '', contact: '', address: '' }

    // validation errors
    if (err.message.includes('supplier validation failed') || err.message.includes('Validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// store new supplier
const store = async (req, res) => {

    const { name, contact, address } = req.body

    try {
        const supplier = await Supplier.create({ name, contact, address })

        res.status(201)
            .json({ supplier })
    }
    catch (err) {

        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }

}

const create = (req, res) => {

    res.render('pages/create-supplier', { title: 'Add supplier' })
}

const edit = async (req, res) => {

    const supplier = await Supplier.find({ _id: req.params.id })

    res.render('pages/edit-supplier', { title: 'Edit supplier', supplier: supplier[0] })
}

const update = async (req, res) => {

    const { name, contact, address } = req.body

    try {
        const supplier = await Supplier.updateOne({ _id: req.params.id }, {
            $set: {
                name, contact, address
            }
        }, { new: true, runValidators: true })


        res.status(201)
            .json({ supplier })
    }
    catch (err) {

        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }
}

const destroy = (req, res) => {

}


module.exports = {
    create,
    store,
    update,
    edit,
    destroy
}