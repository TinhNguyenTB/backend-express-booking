module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Doctor_Infor', 'addressClinic'),
            queryInterface.removeColumn('Doctor_Infor', 'nameClinic')
        ]);
    },

    down: (queryInterface, Sequelize) => {
        // Thực hiện việc rollback ở đây nếu cần
    }
};
