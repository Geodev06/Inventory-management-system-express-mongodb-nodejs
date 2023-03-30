const Supplier = require('../models/Supplier')
const Category = require('../models/Category')
const Customer = require('../models/Customer')
const Product = require('../models/Product')
const Order = require('../models/Order')

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


const dashboard = (req, res) => {
    res.render('pages/dashboard', { title: 'Dashboard' })

}

const inventory = async (req, res) => {
    let suppliers = await Supplier.find({}).sort({ createdAt: -1 })
    let categories = await Category.find({}).sort({ createdAt: -1 })
    res.render('pages/inventory', { title: 'Inventory', suppliers: suppliers, categories: categories })
}

const customer = async (req, res) => {
    let customer = await Customer.find({}).sort({ createdAt: -1 })
    res.render('pages/customer', { title: 'Customer', customers: customer })
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


    res.render('pages/product', { title: 'Product', products: items })
}

const order = async (req, res) => {

    let products = await Product.find({}).sort({ createdAt: -1 })
    let suppliers = await Supplier.find({})
    let items = []

    let customers = await Customer.find({}).sort({ createdAt: -1 })
    let orders = await Order.find({}).sort({ createdAt: -1 })

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

    res.render('pages/order', { title: 'Product', products: items, customers: customers, orders: orders })
}

const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}

module.exports = {
    login,
    register,
    dashboard,
    inventory,
    customer,
    product,
    order,
    logout
}