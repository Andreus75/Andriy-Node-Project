const { Schema, model } = require('mongoose');

const userRoles = require('../../configs/user_roles_enum');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: userRoles.USER,
        enum: Object.values(userRoles)
    },
    password: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
}, { timestamps: true });

module.exports = model('users', userSchema);
