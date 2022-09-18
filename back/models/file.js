module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define('file', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        filename: {
            type: Sequelize.STRING, 
            allowNull:false,
            require: true
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false,
            require: true
        },
        ip: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 0
        }
        
    },{paranoid: true}) 
    return File;
}
