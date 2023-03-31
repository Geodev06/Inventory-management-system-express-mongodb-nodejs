
const Customer = require('../models/Customer')

const Release = require('../models/Release')
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

        res.redirect('/release')
    }
    catch (err) {
        console.log(err)
    }
}

const destroy = async (req, res) => {
    try {
        const released = await Release.deleteOne({ _id: req.params.id })
        res.redirect('/order')
    }
    catch (err) {
        console.log(err)
    }
}



module.exports = {
    store,
    update,
    destroy
}