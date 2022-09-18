module.exports = (sequelize, Sequelize) => {
    const Key = sequelize.define('key', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        key: {
            type: Sequelize.STRING,
            allowNull: false,
            require: true
        },
        expire:{
            type: Sequelize.STRING,
            allowNull: false,
            require: true
        },
        plan:{
            type: Sequelize.STRING,
            allowNull: false,
            require: true
        }
        
    },{paranoid: true}) 
    return Key;
}