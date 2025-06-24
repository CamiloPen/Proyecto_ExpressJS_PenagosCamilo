import express from 'express';
import passport from 'passport';

import { google, googleRedirect } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', google));

authRouter.get('/google/redirect', passport.authenticate('google'), googleRedirect);

authRouter.get('/logout', (req, res) => {
    req.logOut((err) => { });
    res.send('dasdas');
})

export default authRouter;