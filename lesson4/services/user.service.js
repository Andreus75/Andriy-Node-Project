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
        const ageFilter = {};

        Object.keys(filters).forEach((filterParam) => {

            switch (filterParam) {
                case 'name':
                    findObject.name = { $regex: `^${filters.name}`, $options: 'i' };
                    break;
                case 'role':
                    const roleArr = filters.role.split(';');

                    findObject.role = { $in: roleArr } ;
                    break;
                case 'age.gte':
                    Object.assign(ageFilter, { $gte: +filters['age.gte']});
                    break;
                case 'age.lte':
                    Object.assign(ageFilter, { $lte: +filters['age.lte']});
            }
        });

        if (Object.values(ageFilter).length) {
            findObject.age = ageFilter;
        }

        const orderBy = order === 'asc' ? -1 : 1;

        return User
            .find(findObject)
            .sort({ [sortBy]: orderBy })
            .limit(+perPage)
            .skip((page-1) * perPage);
    }
};
