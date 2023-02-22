const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    files: {
        type: Schema.Types.Array,
        required: true,
    },
    fb: {
        type: Schema.Types.ObjectId,
        ref: 'FaceBook'
    },
}, { timestamps: true });


module.exports = mongoose.model('Story', StorySchema);