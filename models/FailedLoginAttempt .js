import db from '../config//DatabaseConnection.js'
import { Sequelize } from 'sequelize'

const FailedLoginAttempt = db.define('failedLoginAttempt', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    last_attempt_time: {
        type: Sequelize.DATE
    }
});

export default FailedLoginAttempt;

// FailedLoginAttempt.sync()
//     .then(() => {
//         console.log('Table created successfully!');
//     })
//     .catch((error) => {
//         console.error('Error creating table:', error);
//     });