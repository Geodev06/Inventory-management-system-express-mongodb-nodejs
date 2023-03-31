const Category = require('../models/Category')
const Release = require('../models/Release')
/**
 * resource functions 
 * store - store data, destroy - delete data
 * @param {*} req 
 * @param {*} res 
 */

const handleErrors = (err) => {

    let errors = { category: '' }

    // validation errors
    if (err.message.includes('category validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// store new category
const store = async (req, res) => {

    const { category } = req.body

    try {
        const supplier = await Category.create({ category })

        res.status(201)
            .json({ category })
    }
    catch (err) {

        const errors = handleErrors(err)

        res.status(400)
            .json({ errors })
    }

}

const create = async (req, res) => {
    const releasesCount = await Release.find({ status: 0 }).sort({ createdAt: -1 }).count()
    res.render('pages/category/create-category', { title: 'Add category', releasesCount: releasesCount })
}

const destroy = async (req, res) => {
    try {
        const category = await Category.deleteOne({ _id: req.params.id })
        res.redirect('/inventory')
    }
    catch (err) {
        console.log(err)
    }
}


module.exports = {
    create,
    store,
    destroy
}