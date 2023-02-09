require('dotenv').config();
const express = require("express");
const app = express();
const cros = require('cors')
const mongoose = require('mongoose');
const usersroute = require('./routes/users/users');
const authroute = require('./routes/auth/auth');
const connectrouter = require('./routes/connect/connect');
const facebookrouter = require('./routes/facebook/facebook');
app.use(cros());

//access for body
app.use(express.json());

//middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//router
app.use('/users', usersroute);

app.use('/auth', authroute);

app.use('/connect', connectrouter);

app.use('/facebook', facebookrouter);
//mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}!!`);
    });
}).catch((error) => {
    console.log(error);
});


