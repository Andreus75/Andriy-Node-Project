module.exports = {
    userNormalizator: (userToNormalize = {}) => {
        const fieldsToRemove = ['password'];
        delete userToNormalize.password;
        fieldsToRemove.forEach((field) => {
            delete userToNormalize._doc[field];
        });

        return userToNormalize;
    }
};
