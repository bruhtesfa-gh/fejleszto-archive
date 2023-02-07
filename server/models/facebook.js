const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaceBookSchema = new Schema({
    accountname: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    stories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Story'
        }
    ]
}, { timestamps: true });


module.exports = mongoose.model('FaceBook', FaceBookSchema);