const { request } = require('express');
const express = require('express');
const UserController = require('../../controller/user-controller');
const puppeteerMethods = require("../../puppeteer/index");
const AuthMiddelware = require("../../middelware/auth");

const router = express.Router();

router.use(AuthMiddelware);

router.get('/', UserController.getAllUsers);

// router.post('/', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const result = await puppeteerMethods.logInToFacebook(username, password);
//         if (result) {
//             //const user = await User.create({ username, password });
//             res.status(200).json(result);
//         } else {
//             res.status(200).json({ "message": "creaditential error" });
//         }
//     } catch (error) {
//         res.status(400).json(error);
//     }
// });

module.exports = router; 