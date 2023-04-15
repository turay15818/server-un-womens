import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import session from "../models/SessionModel.js";
import { Sequelize } from "sequelize";
import path from 'path'

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



export const addUser = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const phoneNo = req.body.phoneNo;
    const address = req.body.address;
    const role = req.body.role;
    const password = req.body.password;
    const confPassword = req.body.confPassword;

    const name = req.body.name;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', 'gif'];

    if (password !== confPassword) return res.status(400).json({ msg: "Sorry, but password does not match" });
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 20000000) return res.status(422).json({ msg: "Image must be less than 20 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNo: phoneNo,
                role: role,
                password: hashedPassword,
                address: address,
                name: name,
                image: fileName,
                url: url,

                userId: req.userId
            });
            res.status(201).json({ msg: "Loan Request Send Successfully" });
        } catch (error) {
            console.log(error.message);
        }
    })

}