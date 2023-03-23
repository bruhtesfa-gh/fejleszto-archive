const Story = require('../models/story');

module.exports = {
    /** @type {import("express").RequestHandler} */
    async createFaceBookStories(req, res) {
        try {

        } catch (error) {

        }
    },
    /** @type {import("express").RequestHandler} */
    async getAllStories(req, res) {
        try {

        } catch (error) {
            res.status(500).json({ 'message': error + '\n' });
        }
    },
    /** @type {import("express").RequestHandler} */
    async findStory(req, res) {
        try {
            const story = await Story.findById(req.params.id);
            if (story)
                return res.status(200).json(story);
            return res.status(204).json({});
        } catch (error) {
            res.status(500).json({ 'message': error + '\n' });
        }
    },

}