const express = require('express');
const AuthMiddelware = require("../../middelware/auth");
const FaceBookController = require('../../controller/facebook-controller');

const router = express.Router();

router.use(AuthMiddelware);

router.get('/stories', FaceBookController.getAllStories);

module.exports = router; 