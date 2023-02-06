const express = require('express');
const User = require('../../models/User');
const puppeteerMethods = require("../../puppeteer/index");

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ 'message': 'all users' });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await puppeteerMethods.logInToFacebook(username, password);
        if (result) {
            //const user = await User.create({ username, password });
            res.status(200).json(result);
        } else {
            res.status(200).json({ "message": "creaditential error" });
        }
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router; 