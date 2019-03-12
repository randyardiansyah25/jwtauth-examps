
require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const userRoutes = require('./routes/user');

//================================ IMPLEMENTATION ========================================
mongoose.connect(config.DB, {useNewUrlParser: true}).then(
    () => {
        console.log('Database is connected!')
    },
    err => {
        console.log(`Error found : ${err}`)
    }
)

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ 
        extended: false
    })
);
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send("hello")
});

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
});

