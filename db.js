const sequelize = require('sequelize')

const db = new sequelize('mytodos', 'mytodo', 'mytodo', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    }
})

const users = db.define('persons', {
    firstname: sequelize.STRING,
    lastname: sequelize.STRING,
    email: sequelize.STRING,
    username: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }   

})

const todolist = db.define('lists', {
    username: {
        type: sequelize.STRING,
        allowNull: false,
    },
    task: {
        type: sequelize.STRING,
        allowNull: false
    },
    striked: {
        type: sequelize.STRING,
        defaultValue: false,
        allowNull: false
    }
})

db.sync()
.then(() => console.log('database has been synced'))
.catch(() => console.log('error creating database'))

module.exports = {
    db,
    todolist,
    users
}