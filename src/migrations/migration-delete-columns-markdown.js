module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Markdowns', 'specialtyId'),
            queryInterface.removeColumn('Markdowns', 'clinicId')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        // Thực hiện việc rollback ở đây nếu cần
    }
};
