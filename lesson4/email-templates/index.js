const emailActionEnum = require('../../configs/email-action.enum');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!!'
    },
    [emailActionEnum.ORDER_CONFIRMED]: {
        templateName: 'order-confirmed',
        subject: 'Cool !!!'
    }
};


