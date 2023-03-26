require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')


const authRoutes = require('./routes/authRoutes')
const supplierRoutes = require('./routes/supplierRoutes')


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
}).then((result) => app.listen(PORT))
    .catch((err) => console.log(err))


app.use(authRoutes)

app.use('/supplier', supplierRoutes)

app.use((req, res, next) => {
    res.status(404)
        .render('404', { title: 'Page not found!' })
})

