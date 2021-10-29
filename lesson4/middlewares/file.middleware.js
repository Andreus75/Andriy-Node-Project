const {PHOTOS_MIMETYPES, PHOTO_MAX_SIZE} = require('../../configs/constants');
const {NOT_SUPPORTED_FORMAT, ClientErrorBadRequest} = require('../../configs/error.enum');

module.exports = {
    checkUserAvatar: ( request, response, next ) => {
        try {
            const { avatar } = request.files || {};

            if (!avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = avatar;

            if (!PHOTOS_MIMETYPES.includes(mimetype)) {
                return next({
                    message: NOT_SUPPORTED_FORMAT,
                    status: ClientErrorBadRequest
                });
            }

            if (size > PHOTO_MAX_SIZE) {
                return next({
                    message: `File ${name} is too big`,
                    status: ClientErrorBadRequest
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
