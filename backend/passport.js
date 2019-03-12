require('dotenv/config');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = mongoose.model("user");
const opts = {};
const SECRET = process.env.SECRET_KEY || "secret";


opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

module.exports = passport => {
    passport.use(new JWTStrategy(opts, (jwt_payload, done)=>{
        User.findById(jwt_payload.id).then(user => {
            if (user){
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => console.log(err));
    }));

}