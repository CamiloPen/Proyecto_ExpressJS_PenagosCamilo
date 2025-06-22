import express from 'express';
import passport from 'passport';
import { login } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

authRouter.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    if (req.user.rol) {
        res.redirect('/courses')
    } else {
        res.send(`
      <html>
        <head>
          <script>
            window.location.href = 'http://localhost:5173/register';
          </script>
        </head>
        <body>Redireccionando a tu perfil...</body>
      </html>
    `);
    }
});

authRouter.get('/login', login)

authRouter.get('/logout', (req, res) => {
    req.logOut((err) => { });
    res.send('dasdas');
})

export default authRouter;