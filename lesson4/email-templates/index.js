const emailActionEnum = require('../../configs/email-action.enum');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome !!!'
    },
    [emailActionEnum.ORDER_CONFIRMED]: {
        templateName: 'order-confirmed',
        subject: 'Cool !!!'
    },
    [emailActionEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something, dont worry :)'
    }
};


