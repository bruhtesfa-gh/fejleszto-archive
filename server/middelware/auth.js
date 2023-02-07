const jwt = require('jsonwebtoken');
const User = require('../models/user');

/** @type {import("express").RequestHandler} */
const AuthMiddelware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({ error: 'Authorization token required' });

    const token = authorization.split(' ')[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req._id = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        return res.status(401).json({ error });
    }
};

module.exports = AuthMiddelware;