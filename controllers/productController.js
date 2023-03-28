const Product = require('../models/Product')
const Supplier = require('../models/Supplier')

/**
 * resource functions 
 * store - store data, update - update data, destroy - delete data
 * @param {*} req 
 * @param {*} res 
 */

const handleErrors = (err) => {

    let errors = {
        name: '',
        supplier: '',
        stock: '',
        acquisition_price: '',
        retail_price: ''
    }
    console.log(err)

    // validation errors
    if (err.message.includes('product validation failed') || err.message.includes('Validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// store new product
const store = async (req, res) => {

    const { name, supplier, stock, acquisition_price, retail_price } = req.body

    try {
        const product = await Product.create({ name, supplier, stock, acquisition_price, retail_price })

        res.status(201)
            .json({ product })
    }
    catch (err) {

        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }

}

const create = async (req, res) => {

    let suppliers = await Supplier.find({}).sort({ createdAt: -1 })

    res.render('pages/product/create-product', { title: 'Add Product', suppliers: suppliers })
}

const edit = async (req, res) => {

    const product = await Product.find({ _id: req.params.id })

    res.render('pages/product/edit-product', { title: 'Edit Product', product: product[0] })
}

const update = async (req, res) => {

    const { name, supplier, stock, price } = req.body

    try {
        const product = await Product.updateOne({ _id: req.params.id }, {
            $set: {
                name, supplier, stock, price
            }
        }, { new: true, runValidators: true })


        res.status(201)
            .json({ product })
    }
    catch (err) {

        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }
}

const destroy = async (req, res) => {
    try {
        const product = await Product.deleteOne({ _id: req.params.id })
        res.redirect('/product')
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