const Supplier = require('../models/Supplier')
const Category = require('../models/Category')
const Customer = require('../models/Customer')

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


    res.render('pages/product', { title: 'Product' })
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
    logout
}