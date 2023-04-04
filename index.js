require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
// App routes
const authRoutes = require('./routes/authRoutes')
const supplierRoutes = require('./routes/supplierRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const customerRoutes = require('./routes/customerRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const releaseRoutes = require('./routes/releaseRoutes')

const app = express()

// middleware
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs')

const DB = process.env.MONGO_DB

const PORT = 3000

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    app.listen(PORT)
    console.log('App is running at localhost:/' + PORT)
}).catch((err) => console.log(err))


app.use(authRoutes)
app.get('/notfound', (req, res, next) => {
    res.status(404)
        .render('404', { title: 'Page not found!' })
})

app.use('/supplier', supplierRoutes)
app.use('/category', categoryRoutes)
app.use('/customer', customerRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/release', releaseRoutes)

app.use((req, res, next) => {
    res.redirect('/notfound')
    next()
})