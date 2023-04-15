import express from "express";
import session from "../models/SessionModel.js";
import {
    // getUsers,
    addUser,
    // updateUser,
    // getUserById,
    // lastUser,
    // deleteUser
} from '../controllers/UserController.js'
import { resetPasswordToken, forgotPassword } from '../controllers/ForgotPassword.js'
import { verifyUser, adminOnly } from "../middleware/AuthorisedUser.js";
import { Sequelize } from "sequelize";
const router = express.Router();


router.post('/forgotPassword', forgotPassword)
router.post('/reset-password/:token', resetPasswordToken)


// router.get('/users', verifyUser, adminOnly, getUsers)
// router.get('/lastUser', lastUser)
// router.get('/users/:uid', verifyUser, adminOnly, getUserById)
router.post('/users', addUser)
// router.patch('/users/:uid', adminOnly, updateUser)
// router.delete('/users/:uid', verifyUser, adminOnly, deleteUser)



router.get('/deletession', async (req, res) => {
    function deleteExpiredSessions() {
        const now = new Date();
        session.destroy({ where: { expires: { [Sequelize.Op.lt]: now } } })
            .then(() => {
                console.log('Expired sessions deleted');
            })
            .catch((error) => {
                console.error(error);
            });
    }
    setInterval(deleteExpiredSessions, 60 * 60 * 1000);
})

export default router