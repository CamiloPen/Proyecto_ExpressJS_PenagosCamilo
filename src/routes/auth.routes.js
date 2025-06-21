import express from 'express';
import passport from 'passport';
import { login } from '../controllers/auth.controller.js';

const authRouter  = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => { 
    res.redirect('/courses')
});

authRouter.get('/login', login)

authRouter.get('/logout', (req, res) => {
    req.logOut((err) => {});
    res.send('dasdas');
})

export default authRouter;