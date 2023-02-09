const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
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

userSchema.statics.signUp = async function (email, password) {
    if (!email || !password)
        throw Error('email and password filds are required');
    if (!validator.default.isEmail(email))
        throw Error('Invalid Email');
    if (!validator.default.isStrongPassword(password))
        throw Error('Not Strong Password');

    const exists = await this.findOne({ email });

    if (exists) {
        throw Error("Email Alrady in use");
    }

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    return await this.create({ email: email, password: hash });
}

userSchema.statics.signIn = async function (email, password) {
    if (!email || !password)
        throw Error('email and password filds are required');

    const user = await this.findOne({ email });

    if (!user) {
        throw Error("Incorrect Email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match)
        throw Error('Invalid Creditential');

    return user;
}

module.exports = mongoose.model('User', userSchema);