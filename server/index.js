require('dotenv').config();
const express = require("express");
const app = express();
const path = require('path');
const cros = require('cors')
const mongoose = require('mongoose');
const usersroute = require('./routes/users/users');
const authroute = require('./routes/auth/auth');
const connectrouter = require('./routes/connect/connect');
const facebookrouter = require('./routes/facebook/facebook');
const storyrouter = require('./routes/story/story');

const ConnectorController = require('./controller/connector-controller');
app.use(cros());

//access for body
app.use(express.json());

//middleware
app.use(express.static(path.join(__dirname, 'storage')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.get('/insta-auto-replay', async function (req, res) {
    res.send({
        'message': 'recived'
    })
})

app.get('/webhooks', async function (req, res) {
    console.log("abebe");
    console.log(req);
    res.send(req.query['hub.challenge']);
})


//router
app.use('/users', usersroute);

app.use('/auth', authroute);

app.use('/connect', connectrouter);
app.get('/testpptr', ConnectorController.testPuppeteer);
app.get('/testapp', ConnectorController.testApp);
app.use('/facebook', facebookrouter);
app.use('/stories', storyrouter);


//mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}!!`);
    });
}).catch((error) => {
    console.log(error);
});


