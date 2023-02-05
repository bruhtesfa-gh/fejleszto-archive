require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/users/users');
//access for body
app.use(express.json());
//middleware
app.use((req, res, next) => {
    next();
});

//router
app.use('/users', userRouter);
//mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}!!`);
    });
}).catch((error) => {
    console.log(error);
});


