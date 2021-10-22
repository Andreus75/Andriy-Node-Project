const { Schema, model } = require('mongoose');
const ActionTokenTypeEnum = require('../../configs/action-token-type-enum');

const actionForgotSchema = new Schema({
    token_forgot: {
        type: String,
        required: true,
        trim: true
    },

    token_type: {
        type: String,
        required: true,
        enum: Object.values(ActionTokenTypeEnum),
        trim: true
    },

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('action_forgot', actionForgotSchema);
