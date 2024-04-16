module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('histories', 'files', {
                type: Sequelize.BLOB('long')
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('histories', 'files', {
                type: Sequelize.TEXT
            })
        ])
    }
};