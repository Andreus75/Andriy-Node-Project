module.exports = {
    userNormalization: (userToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        delete userToNormalize.password;

        fieldsToRemove.forEach((field) => {
            delete userToNormalize._doc[field];
        });

        return userToNormalize;
    },

    userNormaliseToAuth: (userToNormalize = {}) => {
        const fieldsToRemove = ['password'];

        delete userToNormalize.password;

        fieldsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
