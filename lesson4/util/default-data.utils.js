const User = require('../dataBase/User');
const { ADMIN } = require('../../configs/user_roles_enum');
const { DEFAULT_PASSWORD } = require('../../configs/config');

module.exports = async () => {
    const user = await User.findOne({ role: ADMIN });

    if (!user) {
        await User.createUserWithHashPassword({
            name: 'Anna',
            email: 'Anna.admin@site.com',
            password: DEFAULT_PASSWORD,
            role: ADMIN
        });
    }
};
