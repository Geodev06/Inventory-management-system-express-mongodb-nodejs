
const Customer = require('../models/Customer')

const Release = require('../models/Release')
const Product = require('../models/Product')
const Order = require('../models/Order')

/**
 * resource functions 
 * store - store data, update - update data, destroy - delete data
 * @param {*} req 
 * @param {*} res 
 */


// store new order
const store = async (req, res) => {

    const orders = await Order.find({}).sort({ createdAt: -1 })
    let customer_name = 'N/A'

    if (req.body.customer_id != '') {
        const customer = await Customer.findOne({ _id: req.body.customer_id })
        customer_name = customer.name
    }

    let items = []
    let no_of_items = 0
    let total_amount = 0
    const status = 0

    orders.forEach((order) => {
        no_of_items += order.quantity
        total_amount += parseFloat(order.amount)

        items.push(
            {
                product_id: order.product_id,
                product_name: order.product,
                category: order.category,
                quantity: order.quantity,
                sub_total: parseFloat(order.amount).toFixed(2)
            }
        )
    })

    const release = await Release.create(
        {
            customer_name,
            items,
            no_of_items,
            total_amount,
            status
        }
    )
    // delete order
    const deleted_order = await Order.deleteMany({})

    res.status(201)
        .json({ release, deleted_order })

}

const update = async (req, res) => {
    try {

        var date = new Date()
        const released = await Release.updateOne({ _id: req.params.id }, {
            $set: {
                status: 1,
                releasedAt: date.toLocaleDateString()
            }
        })


        const releases = await Release.find({}).sort({ createdAt: -1 })
        const products = await Product.find({})

        const orderedItem = []
        const toUpdate = []

        releases[0].items.forEach((item) => {
            orderedItem.push(
                {
                    _id: item.product_id,
                    quantity: item.quantity
                }
            )
        })

        for (let i = 0; i < orderedItem.length; i++) {
            for (let j = 0; j < products.length; j++) {
                if (orderedItem[i]._id == products[j]._id.toString()) {
                    var item = {
                        _id: orderedItem[i]._id,
                        stock: parseInt(products[j].stock) - parseInt(orderedItem[i].quantity),
                    }
                    toUpdate.push(item)

                }
            }
        }

        const documents = toUpdate.map(obj => {
            return {
                updateOne: {
                    filter: { _id: obj._id },
                    update: { stock: obj.stock }
                }
            }
        })

        const updated = await Product.bulkWrite(documents, { ordered: false })


        res.redirect('/release')
    }
    catch (err) {
        console.log(err)
    }

}

const destroy = async (req, res) => {
    try {
        const released = await Release.deleteOne({ _id: req.params.id })
        res.redirect('/release')
    }
    catch (err) {
        console.log(err)
    }
}

const show = async (req, res) => {
    try {
        const released = await Release.findOne({ _id: req.params.id })

        res.render('pages/receipt', { released: released, title: released._id.toString() })
    } catch (err) {
        res.redirect('/notfound')
    }
}


module.exports = {
    store,
    update,
    show,
    destroy
}