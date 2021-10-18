const jwt = require('jsonwebtoken');

const ErrorHandler = require('../../errors/ErrorHandler');
const {INVALID_TOKEN} = require('../../configs/error.enum');
const tokenTypeAccess = require('../../configs/token-type.enum');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../../configs/config');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: async (token, tokenType = tokenTypeAccess.ACCESS) => {
        try {
            const secret = tokenType === tokenTypeAccess.ACCESS ? JWT_ACCESS_SECRET : JWT_REFRESH_SECRET;
            await jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN, 401);
        }
    }
};
