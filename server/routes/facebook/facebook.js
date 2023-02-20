const express = require('express');
const AuthMiddelware = require("../../middelware/auth");
const FaceBookController = require('../../controller/facebook-controller');

const router = express.Router();

router.use(AuthMiddelware);

router.get('/stories', FaceBookController.getAllStories);
router.post('/scrap-stories', FaceBookController.ScrapFaceBookStories);
module.exports = router; 