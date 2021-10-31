const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const User = require('../dataBase/User');
const { emailService } = require('../services');
const { REMINDER } = require('../../configs/email-action.enum');

module.exports = async () => {
    const previousMonth = dayJs.utc().subtract(1, 'month');

    const users = await User
        .find({updatedAt: { $lt: previousMonth }})
        .populate('_id');

    await Promise.allSettled(users.map(user => emailService.sendMail(user.email, REMINDER, {userName: user.name})));
};

