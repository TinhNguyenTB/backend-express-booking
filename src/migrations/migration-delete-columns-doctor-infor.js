module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Doctor_Infor', 'count')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        // Thực hiện việc rollback ở đây nếu cần
    }
};
