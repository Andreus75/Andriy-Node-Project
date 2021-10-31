const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { USER_EMAIL, USER_PASSWORD } = require('../../configs/config');
const allTemplate = require('../email-templates');
const ErrorHandler = require('../../errors/ErrorHandler');
const { WRONG_TEMPLATE_NAME } = require('../../configs/error.enum');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'lesson4', 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {

    const templateInfo = allTemplate[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler({
            message: WRONG_TEMPLATE_NAME,
            status: 400
        });
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};
