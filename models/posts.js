const Sequelize = require('sequelize');

module.exports = class Posts extends Sequelize.Model{
    static init(sequelize){
        return super.init({
                content: {
                    type: Sequelize.TEXT('long'),
                },
                writer: {
                    type: Sequelize.STRING(20),
                },
		}, 
        {
            sequelize,
            timestamps: false,
            modelName: 'Posts',
            tableName: 'Posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
    
    }
};
