const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
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
    facebook: {
        type: Schema.Types.ObjectId,
        ref: 'FaceBook'
    },
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);