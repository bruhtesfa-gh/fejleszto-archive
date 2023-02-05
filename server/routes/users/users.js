const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ 'message': 'all users' });
});

router.post('/', (req, res) => {
    res.json({ "message": req.body });
});

module.exports = router; 