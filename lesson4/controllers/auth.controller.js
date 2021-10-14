const { userNormalization } = require('../util/user.util');

module.exports = {
    login: (request, response, next) => {
        try {
            const { user } = request;

            const userNormalised = userNormalization(user);

            response.json(userNormalised);
        } catch (e) {
            next(e);
        }
    }
};
