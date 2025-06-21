export const login = (req, res) => { 
    if (req.user) {
        res.redirect('/profile')
    } else {
        res.send('login')
    }
}

export const pass = (req, res, next) => { 
    if (req.user) {
        next()
    } else {
        res.send('no no no')
    }
}