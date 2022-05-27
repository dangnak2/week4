const Sequelize = require('sequelize');

module.exports = class Auth extends Sequelize.Model{
    static init(sequelize){
        return super.init({
                email: {
                    type: Sequelize.STRING(20),
                },
                password: {
                    type: Sequelize.STRING(20),
                },
		}, 
        {
            sequelize,
            timestamps: false,
            modelName: 'Auth',
            tableName: 'Auths',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
    
    }
};
