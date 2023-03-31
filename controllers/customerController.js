const Customer = require('../models/Customer')
const Release = require('../models/Release')
/**
 * resource functions 
 * store - store data, update - update data, destroy - delete data
 * @param {*} req 
 * @param {*} res 
 */

const handleErrors = (err) => {

    let errors = { name: '', contact: '', email: '', address: '' }

    // validation errors
    if (err.message.includes('customer validation failed') || err.message.includes('Validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// store new Customer
const store = async (req, res) => {

    const { name, contact, email, address } = req.body

    try {
        const customer = await Customer.create({ name, contact, email, address })

        res.status(201)
            .json({ customer })
    }
    catch (err) {

        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }

}

const create = async (req, res) => {
    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()
    res.render('pages/customer/create-Customer', { title: 'Add Customer', releasesCount: releasesCount })
}

const edit = async (req, res) => {

    const customer = await Customer.find({ _id: req.params.id })
    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()
    res.render('pages/customer/edit-Customer', { title: 'Edit Customer', customer: customer[0], releasesCount: releasesCount })
}

const update = async (req, res) => {

    const { name, contact, email, address } = req.body

    try {
        const customer = await Customer.updateOne({ _id: req.params.id }, {
            $set: {
                name, contact, email, address
            }
        }, { new: true, runValidators: true })


        res.status(201)
            .json({ customer })
    }
    catch (err) {

        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }
}

const destroy = async (req, res) => {
    try {
        const customer = await Customer.deleteOne({ _id: req.params.id })
        res.redirect('/customer')
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = {
    create,
    store,
    update,
    edit,
    destroy
}