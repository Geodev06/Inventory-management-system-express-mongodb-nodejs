const Supplier = require('../models/Supplier')
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
    res.render('pages/inventory', { title: 'Inventory', suppliers: suppliers })

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
    logout
}