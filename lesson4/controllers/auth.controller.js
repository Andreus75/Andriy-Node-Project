const {userNormaliseToAuth} = require('../util/user.util');

module.exports = {
    login: (request, response, next) => {
        try {
            const { user } = request;

            const userNormalised = userNormaliseToAuth(user);

            response.json(userNormalised);
        } catch (e) {
            next(e);
        }
    }
};
