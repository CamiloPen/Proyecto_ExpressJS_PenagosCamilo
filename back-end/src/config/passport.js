import passport from "passport";
import passportGoogle from 'passport-google-oauth20';
import User from "../models/user.model.js";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../utils/secrets.js'

const GoogleStrategy = passportGoogle.Strategy;

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({googleId: profile.id});
        
        if (!user) {
            const newUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails?.[0].value
            })

            if (newUser) {
                done(null, newUser);
            } 
        } else {
            done(null, user);
        }
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser( async(id, done) => {
    const user = await User.findById(id)
    done(null, user)
})