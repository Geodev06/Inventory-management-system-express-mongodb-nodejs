const Supplier = require('../models/Supplier')
const Category = require('../models/Category')
const Order = require('../models/Order')

/**
 * resource functions 
 * store - store data, update - update data, destroy - delete data
 * @param {*} req 
 * @param {*} res 
 */

const handleErrors = (err) => {

    let errors = {
        product: '',
        category: '',
        quantity: '',
        amount: '',
        supplier_id: ''
    }

    // validation errors
    if (err.message.includes('order validation failed') || err.message.includes('Validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// store new order
const store = async (req, res) => {

    const { product_id, product, category, quantity, amount, supplier_id } = req.body

    const productOrder = await Order.findOne({ product_id: product_id })

    if (productOrder) {

        const qty = parseInt(quantity) + parseInt(productOrder.quantity)
        const amt = parseFloat(amount) + parseFloat(productOrder.amount)

        const order = await Order.updateOne({ product_id: product_id }, {
            $set: {
                product_id, product, category, quantity: qty, amount: amt.toFixed(2), supplier_id
            }
        }, { new: true, runValidators: true })


        res.status(201)
            .json({ order })
    }
    else {

        try {
            const order = await Order.create({ product_id, product, category, quantity, amount, supplier_id })

            res.status(201)
                .json({ order })
        }
        catch (err) {

            const errors = handleErrors(err)

            res.status(400)
                .json({ errors })
        }

    }
}

const create = async (req, res) => {

}

const edit = async (req, res) => {

    const product = await Order.find({ _id: req.params.id })

    let suppliers = await Supplier.find({}).sort({ createdAt: -1 })
    let categories = await Category.find({}).sort({ createdAt: -1 })

    let item = []

    product.forEach((product) => {
        suppliers.forEach((supplier) => {
            if (product.supplier === supplier._id.toString()) {

                item.push({
                    _id: product._id,
                    name: product.name,
                    stock: product.stock,
                    category: product.category,
                    acquisition_price: product.acquisition_price,
                    retail_price: product.retail_price,
                    supplier_id: supplier._id.toString(),
                    supplier_name: supplier.name
                })
            }
        })
    })

    res.render('pages/product/edit-product', { title: 'Edit Order', product: item[0], suppliers: suppliers, categories: categories })
}

const update = async (req, res) => {

    const { name, supplier, stock, price } = req.body

    try {
        const product = await Order.updateOne({ _id: req.params.id }, {
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
        const order = await Order.deleteOne({ _id: req.params.id })
        res.redirect('/order')
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