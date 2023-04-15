import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import FailedLoginAttempt from '../models/FailedLoginAttempt .js'

// export const Login = async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             email: req.body.email
//         }
//     })
//     if (!user) return res.status(404).json({ msg: "Email does not exit" })
//     const comparePassword = await bcrypt.compare(req.body.password, user.password)
//     if (!comparePassword) return res.status(404).json({ msg: "Password is not correct" })
//     req.session.userId = user.uid;
//     const userId = user.userId;
//     const id = user.id;
//     const email = user.email;
//     const fullName = user.fullName;
//     const department = user.department;
//     const role = user.role;
//     const address = user.address;
//     const phoneNo = user.phoneNo;
//     res.status(200).json({ id, userId, fullName, email, department, role, address, phoneNo })
//     console.log(res)
// }


const MAX_LOGIN_ATTEMPTS = 3;
const LOCK_TIME_IN_MINUTES = 60;

export const Login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).json({ msg: "Email does not exist" });
        }

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            let failedLogin = await FailedLoginAttempt.findOne({ where: { user_id: user.id } });
            if (!failedLogin) {
                failedLogin = await FailedLoginAttempt.create({ user_id: user.id, attempts: 1 });
            } else {
                failedLogin.attempts++;
                failedLogin.last_attempt_time = new Date();
                await failedLogin.save();
            }

            if (failedLogin.attempts >= MAX_LOGIN_ATTEMPTS) {
                const lockTime = new Date(failedLogin.last_attempt_time.getTime() + (LOCK_TIME_IN_MINUTES * 60 * 1000));
                if (lockTime > new Date()) {
                    const remainingTimeInMinutes = Math.ceil((lockTime - new Date()) / (60 * 1000));
                    return res.status(401).json({ msg: `Your account is locked. Please try again in ${remainingTimeInMinutes} minute(s).` });
                } else {
                    failedLogin.attempts = 0;
                    await failedLogin.save();
                }
            }

            return res.status(404).json({ msg: "Password is not correct" });
        }

        const failedLogin = await FailedLoginAttempt.findOne({ where: { user_id: user.id } });
        if (failedLogin && failedLogin.attempts >= MAX_LOGIN_ATTEMPTS) {
            const lockTime = new Date(failedLogin.last_attempt_time.getTime() + (LOCK_TIME_IN_MINUTES * 60 * 1000));
            if (lockTime > new Date()) {
                const remainingTimeInMinutes = Math.ceil((lockTime - new Date()) / (60 * 1000));
                return res.status(401).json({ msg: `Your account is locked. Please try again in ${remainingTimeInMinutes} minute(s).` });
            } else {
                failedLogin.attempts = 0;
                await failedLogin.save();
            }
        }
        if (failedLogin) {
            failedLogin.attempts = 0;
            await failedLogin.save();
        }
        req.session.userId = user.uid;
        const userId = user.userId;
        const id = user.id;
        const email = user.email;
        const fullName = user.fullName;
        const department = user.department;
        const role = user.role;
        const address = user.address;
        const phoneNo = user.phoneNo;
        const url = user.url;
        res.status(200).json({ id, userId, fullName, email, department, role, address, phoneNo, url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Internal server error' });
    }
};



export const Me = async (req, res) => {
    if (!req.session.userId)
        return res.status(400).json({ msg: "Please login to your account" })
    const user = await User.findOne({
        attributes: ['id', 'fullName', 'email', 'phoneNo', 'address', 'role', 'department'],
        where: {
            uid: req.session.userId
        }
    })
    if (!user) return res.status(404).json({ msg: "User not Found Please try again" })
    res.status(200).json(user)
}

export const LogoutUser = async (req, res) => {
    req.session.destroy((err) => {
        if (!err) return res.status(400).json({ msg: "Can't log you out" })
        res.status(200).json({ msg: "Logout Successfully" })
    })
}