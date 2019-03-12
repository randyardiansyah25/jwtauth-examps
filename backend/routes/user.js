require('dotenv/config');

const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../helper/validator/input-reg-validator');
const validateLoginInput = require('../helper/validator/input-login-validator');

const User = require('../models/User');

router.post('/register', (req, res) =>{
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then( user => {
        if(user){
            return res.status(404).json({email:"Email already taken!!"});
        }else{
            const avatar = gravatar.url(req.body.email, {s: 200, r: 'pg', d: 'mm'});
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err){
                    console.error("There was an error: ", err);
                }else{
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err){
                            console.error("There was an error: ", err);
                        }else{
                            newUser.password = hash;
                            newUser.save().then(user => res.json(user));
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(404).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then( user => {
        if(!user){
            errors.email = "User not found";
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const SECRET = process.env.SECRET_KEY || "secret";
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }
                jwt.sign(payload, SECRET, { expiresIn: 3600}, (err, token) => {
                    if(err){
                        console.error("There is some error in token: ", err);
                    }else{
                        res.json({
                            access_token: token,
                            token_type: "Bearer",
                            expires_in: 3600,
                            scope: "Read Write"
                            // success: true,
                            // token: `Bearer ${token}`
                        });
                    }
                });
            }else{
                errors.password = "Incorect password!";
                return res.status(400).json(errors);
            }
        });
    });    
});

router.post('/me', passport.authenticate('jwt', { session: false }) ,(req, res) =>{
    return res.json(req.body);
});

module.exports = router;