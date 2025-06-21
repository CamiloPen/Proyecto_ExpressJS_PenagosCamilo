import express from 'express';
import 'dotenv/config';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';

import './config/passport.js'
import { connectDb } from './utils/db.js';
import { COOKIE_KEY } from './utils/secrets.js';
import router from './routes/auth.routes.js';
import courseRouter from './routes/courses.routers.js';
import teacherRouter from './routes/teacher.routes.js';
import { pass } from './controllers/auth.controller.js';

connectDb()
const app = express()
app.use(cors(
    {origin: 'http://localhost:5173'}
));

app.use(session({
    secret: COOKIE_KEY,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use('/auth', router)
app.use('/courses', pass, courseRouter)
app.use('/teachers', pass, teacherRouter)

app.listen({
    hostname: process.env.APP_HOSTNAME,
    port: process.env.APP_PORT
}, () => console.log(`Server listener on http://${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`));