export const pass = (req, res, next) => { 
    if (req.user) {
        next()
    } else {
        res.send('no no no')
    }
}

export const google = { scope: ['email', 'profile'] }

export const googleRedirect = (req, res) => {
    res.redirect('http://localhost:5173/register');
}