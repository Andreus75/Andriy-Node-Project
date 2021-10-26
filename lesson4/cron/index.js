const cron = require('node-cron');

const deleteOldToken = require('./old-token-delete');

module.exports = () => {
    cron.schedule('*/10 * * * * *', async () => {
        console.log('Cron start at', new Date().toISOString());
        await deleteOldToken();
        console.log('Cron stop at', new Date().toISOString());
    });
};
