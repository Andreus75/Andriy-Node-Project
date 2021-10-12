const {userNormalizator} = require("../util/user.util");
module.exports = {
    login: (request, response) => {
        try {
            const { user } = request;

            const userNormalised = userNormalizator(user);

            response.json(userNormalised);
        } catch (e) {
            response.json(e.message);
        }
    }
};
