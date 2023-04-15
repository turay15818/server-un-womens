
import db from "../config/DatabaseConnection.js";
import { Sequelize } from "sequelize";


const session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  data: Sequelize.TEXT,
  expires: Sequelize.DATE,
});

export default session