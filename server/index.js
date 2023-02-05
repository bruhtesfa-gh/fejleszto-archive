require('dotenv').config();
const express = require("express");
const app = express();

const userRouter = require('./routes/users/users');
//access for body
app.use(express.json());
//middleware
app.use((req, res, next) => {
    next();
});

//router
app.use('/users', userRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}!!`);
});