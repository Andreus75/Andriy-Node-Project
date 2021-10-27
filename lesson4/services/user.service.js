const User = require('../dataBase/User');

module.exports = {
    getAllUsers: (query = {}) => {
        const {
            perPage = 20,
            page = 1,
            sortBy = 'createAt',
            order = 'asc',
            ...filters
        } = query;

        console.log(JSON.stringify(filters, null, 2), 'OTHER FILTERS');

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find()
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page-1) * perPage);
    }
};
