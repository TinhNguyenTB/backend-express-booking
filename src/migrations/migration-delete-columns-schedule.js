module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Schedules', 'currentNumber'),
            queryInterface.removeColumn('Schedules', 'maxNumber')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        // Thực hiện việc rollback ở đây nếu cần
    }
};
