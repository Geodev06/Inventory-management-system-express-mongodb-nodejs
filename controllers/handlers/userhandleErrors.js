const userhandleErrors = (err) => {

    let errors = { name: '', email: '', password: '' }

    // invalid email
    if (err.message === 'Incorrect email') {
        errors.email = 'Incorrect email'
    }

    // inavlid passwprd
    if (err.message === 'Incorrect password') {
        errors.password = 'Incorrect password'
    }

    // duplicate error
    if (err.code === 11000) {
        errors.email = 'The email is already taken'
        return errors
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

module.exports = userhandleErrors