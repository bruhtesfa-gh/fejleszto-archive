const express = require('express');
const AuthMiddelware = require("../../middelware/auth");
const StoryController = require('../../controller/story-controller');

const router = express.Router();

router.use(AuthMiddelware);

router.get('/:id', StoryController.findStory);
module.exports = router; 