const { json } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const router = express.Router();

const accessToken = (_id) => jwt.sign({ _id }, process.env.SECRET, { expiresIn: '10d' })

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.signIn(email, password);
        const token = accessToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.post('/signup', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.signUp(email, password);
        const token = accessToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 