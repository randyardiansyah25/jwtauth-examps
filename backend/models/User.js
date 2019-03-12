const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    avatar:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

// let UserSchema = new mongoose.Schema({
//     email:String
// });

const User = mongoose.model("user", UserSchema);

module.exports = User;