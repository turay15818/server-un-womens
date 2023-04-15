import { Sequelize } from "sequelize";
import db from "../config/DatabaseConnection.js";
import User from "./UserModel.js";
const { DataTypes } = Sequelize;

const Product = db.define('product', {
    uid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    cost: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    productCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true
        },
    },

    // freezeTableName: true
});




User.hasMany(Product);
Product.belongsTo(User, { foreignKey: 'userId' });

export default Product;