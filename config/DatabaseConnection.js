import { Sequelize } from "sequelize";

const db = new Sequelize('heroku_e5d874191a6ef42', 'bcb0052ce99391', '8a09797c', {
    host: 'us-cdbr-east-06.cleardb.net',
    port: 3306,
    dialect: 'mysql'
})

export default db;