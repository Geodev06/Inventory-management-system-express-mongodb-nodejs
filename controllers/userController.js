const Supplier = require('../models/Supplier')
const Category = require('../models/Category')
const Customer = require('../models/Customer')
const Product = require('../models/Product')
const Order = require('../models/Order')
const Release = require('../models/Release')

const User = require('../models/User')
const bcrypt = require('bcrypt')
const handleErrors = require('./handlers/userhandleErrors')

// functions
const login = (req, res) => {
    if (res.locals.user) {
        res.redirect('/dashboard')
    }
    res.render('auth/login', { title: 'Login' })
}

const register = (req, res) => {
    res.render('auth/register', { title: 'Register' })
}


const dashboard = async (req, res) => {
    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()
    const productCount = await Product.count()
    const customerCount = await Customer.count()
    const releasedCount = await Release.count()
    const categoryCount = await Category.count()

    res.render('pages/dashboard', {
        title: 'Dashboard',
        releasesCount: releasesCount,
        productCount: productCount,
        customerCount: customerCount,
        releasedCount: releasedCount,
        categoryCount: categoryCount
    })

}

const inventory = async (req, res) => {
    let suppliers = await Supplier.find({}).sort({ createdAt: -1 })
    let categories = await Category.find({}).sort({ createdAt: -1 })
    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()
    res.render('pages/inventory', { title: 'Inventory', suppliers: suppliers, categories: categories, releasesCount: releasesCount })
}

const customer = async (req, res) => {
    let customer = await Customer.find({}).sort({ createdAt: -1 })
    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()

    res.render('pages/customer', { title: 'Customer', customers: customer, releasesCount: releasesCount })
}

const product = async (req, res) => {

    let products = await Product.find({}).sort({ createdAt: -1 })
    let suppliers = await Supplier.find({})
    let items = []

    products.forEach((product) => {
        suppliers.forEach((supplier) => {
            if (product.supplier === supplier._id.toString()) {

                items.push({
                    _id: product._id,
                    product_name: product.name,
                    stock: product.stock,
                    product_category: product.category,
                    acquisition_price: product.acquisition_price,
                    retail_price: product.retail_price,
                    supplier_id: supplier._id.toString(),
                    supplier_name: supplier.name,
                    supplier_contact: supplier.contact,
                    supplier_address: supplier.address
                })
            }
        })
    })

    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()

    res.render('pages/product', { title: 'Product', products: items, releasesCount: releasesCount })
}

const order = async (req, res) => {

    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()

    let products = await Product.find({}).sort({ createdAt: -1 })
    let suppliers = await Supplier.find({})
    let items = []

    let customers = await Customer.find({}).sort({ createdAt: -1 })
    let orders = await Order.find({}).sort({ createdAt: -1 })

    let totalAmount = 0;

    for (let index = 0; index < orders.length; index++) {
        totalAmount += parseFloat(orders[index].amount)
    }

    products.forEach((product) => {
        suppliers.forEach((supplier) => {
            if (product.supplier === supplier._id.toString()) {

                items.push({
                    _id: product._id,
                    product_name: product.name,
                    stock: product.stock,
                    product_category: product.category,
                    retail_price: product.retail_price,
                    supplier_id: supplier._id.toString()
                })
            }
        })
    })

    res.render('pages/order', {
        title: 'Product',
        products: items,
        customers: customers,
        orders: orders,
        totalAmount: totalAmount.toFixed(2),
        releasesCount: releasesCount
    })
}

const release = async (req, res) => {

    const releases = await Release.find({}).sort({ createdAt: -1 })

    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()


    res.render('pages/release', {
        title: 'Release',
        releases: releases,
        releasesCount: releasesCount
    })
}

const profile = async (req, res) => {

    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()
    res.render('pages/profile', { title: 'Profile', releasesCount: releasesCount })
}

const changePassword = async (req, res, next) => {

    try {

        const { name, old_password, password, confirmed_password } = req.body

        if (name == '') {
            return res.status(401)
                .json({ errors: { name: 'Name is required!' } })
        }

        if (password == '' && confirmed_password == '') {
            return res.status(401)
                .json({ errors: { password: 'Password is required!' } })
        }

        if (password != confirmed_password) {
            return res.status(401)
                .json({ errors: { password: 'Password does not match' } })
        }

        const user = await User.findOne({ _id: req.params.id })

        const correct = await bcrypt.compare(old_password, user.password)

        if (correct) {
            const salt = await bcrypt.genSalt()
            const newPassword = await bcrypt.hash(password, salt)
            const success = await User.updateOne({ _id: req.params.id }, {
                $set: {
                    name: name,
                    password: newPassword
                }
            })
            return res.status(200)
                .json({ success })

        } else {
            res.status(401)
                .json({ errors: { old_password: 'Incorrect old password' } })
        }

    } catch (err) {

        res.status(401)
            .json({ err })
    }

}

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

const getComposition = async (req, res) => {

    const products = await Product.find({}).sort({ createdAt: -1 })
    res.json({ products })
}

const getOrders = async (req, res) => {

    const releases = await Release.find({ status: 1 }).sort({ createdAt: -1 })

    const released = releases.map(x => {
        return {
            date: new Date(x.createdAt).toLocaleDateString(),
            amount: parseFloat(x.total_amount).toFixed(2)
        }
    })

    res.json({ released })
}

module.exports = {
    login,
    register,
    dashboard,
    inventory,
    customer,
    product,
    order,
    release,
    profile,
    changePassword,
    // chart
    getComposition,
    getOrders,
    logout
}