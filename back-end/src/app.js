import express from 'express';
import 'dotenv/config';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import './config/passport.js'
import { connectDb } from './utils/db.js';
import { COOKIE_KEY } from './utils/secrets.js';
import { pass } from './controllers/auth.controller.js';
import { authRouter, courseRouter, topicRouter, userRouter, scheduleRouter } from './routes/index.js'

connectDb()
const app = express()

app.use(session({
    secret: COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,      
        sameSite: 'lax',   
        maxAge: 3600000     
    }
}))

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use('/auth', authRouter)
app.use('/courses', courseRouter)
app.use('/topics', pass, topicRouter)
app.use('/schedules', scheduleRouter)
app.use('/user', pass, userRouter)

app.listen({
    hostname: process.env.APP_HOSTNAME,
    port: process.env.APP_PORT
}, () => console.log(`Server listener on http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`));