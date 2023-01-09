module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define('users', {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        noHp: {
            type: Sequelize.INTEGER
        },
        password: {
            type: Sequelize.STRING
        },
    });
    return Users;
}