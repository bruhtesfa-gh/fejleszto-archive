const express = require('express');
const User = require('../../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ 'message': 'all users' });
});

router.post('/', (req, res) => {
    const { username, password } = req.body;
    try {
        const user = async () => await User.create({ username, password });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router; 