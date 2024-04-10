module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('Bookings', 'reason', {
                type: Sequelize.STRING
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        // Thực hiện việc rollback ở đây nếu cần
    }
};
