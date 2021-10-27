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

        const findObject = {};

        Object.keys(filters).forEach((filterParam) => {
            switch (filterParam) {
                case 'name':
                    findObject.name = { $regex: `^${filters.name}`, $options: 'i' };
                    break;
            }
        });

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find(findObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page-1) * perPage);
    }
};
