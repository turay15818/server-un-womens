import User from "../models/UserModel.js";
import Product from '../models/ProductModel.js'
import path from "path"
import { Op } from "sequelize";
import moment from "moment";


export const getProduct = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Awaiting",
                    cost: {
                        [Op.gt]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],

                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        };

        if (req.role === "director") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Awaiting",
                    cost: {
                        [Op.lte]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Product.findAll({
                    attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProductWithinOneDay = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Awaiting",
                    cost: {
                        [Op.gt]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(1, 'days').tolocation()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        };

        if (req.role === "director") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: ["Awaiting"],
                    cost: {
                        [Op.lte]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(1, 'days').tolocation()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    uplocationdAt: {
                        [Op.gte]: moment().subtract(1, 'days').tolocation()
                    },
                    status: ["approved", "rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Product.findAll({
                    attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                        createdAt: {
                            [Op.gte]: moment().subtract(1, 'days').tolocation()
                        }
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProductWithinSevenDays = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Awaiting",
                    cost: {
                        [Op.gt]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(7, 'days').tolocation()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        };

        if (req.role === "director") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Awaiting",
                    cost: {
                        [Op.lte]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(7, 'days').tolocation()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    uplocationdAt: {
                        [Op.gte]: moment().subtract(7, 'days').tolocation()
                    },
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Product.findAll({
                    attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                        createdAt: {
                            [Op.gte]: moment().subtract(7, 'days').tolocation()
                        }
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProductWithinOneMonth = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Awaiting",
                    cost: {
                        [Op.gt]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(30, 'days').tolocation()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        };

        if (req.role === "director") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Awaiting",
                    cost: {
                        [Op.lte]: 5000
                    },
                    createdAt: {
                        [Op.gte]: moment().subtract(30, 'days').tolocation()
                    }
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    createdAt: {
                        [Op.gte]: moment().subtract(30, 'days').tolocation()
                    },
                    status: ["Approved", "Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Product.findAll({
                    attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                    where: {
                        status: "Awaiting",
                        userId: req.userId,
                        createdAt: {
                            [Op.gte]: moment().subtract(30, 'days').tolocation()
                        }
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getApprovedProduct = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Approved",
                    cost: {
                        [Op.gt]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        };

        if (req.role === "director") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Approved",
                    cost: {
                        [Op.lte]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: ["Approved"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Product.findAll({
                    attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                    where: {
                        userId: req.userId,
                        status: ["Approved"]
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getRejectedProduct = async (req, res) => {
    try {
        let response;
        if (req.role === "ceo") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: "Rejected",
                    cost: {
                        [Op.gt]: 5000
                    },
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        };

        if (req.role === "director") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    cost: {
                        [Op.lte]: 5000
                    },
                    status: ["Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],
                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        if (req.role === "accountant") {
            response = await Product.findAll({
                attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                where: {
                    status: ["Rejected"]
                },
                order: [
                    ['createdAt', 'DESC'],
                ],

                include: [{
                    model: User,
                    attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                }]
            });
        }

        else {
            if (req.role === "user") {
                response = await Product.findAll({
                    attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
                    where: {
                        userId: req.userId,
                        status: ["Rejected"]
                    },
                    order: [
                        ['createdAt', 'DESC'],
                    ],

                    include: [{
                        model: User,
                        attributes: ['uid', 'id', 'firstName', 'lastName', 'email', 'phoneNo', 'address', 'role', 'url']
                    }]
                });
            }
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await Product.findOne({
            attributes: ['uid', 'id', 'name', 'productName', 'cost', 'productategory', 'location', 'status', 'url', 'userId', 'owner'],
            where: {
                uid: req.params.uid
            },

            include: [{
                model: User,
                attributes: ['uid', 'id', 'fullName', 'staffId', 'department', 'email', 'phoneNo', 'address', 'role']
            }]
        })
        if (!response) return res.status(404).json({ msg: "Request not Found" })
        res.status(200).json(response)
        console.log(response)
    } catch (error) {
        res.status(401).json({ msg: error.message })
        console.log(error)
    }
}

export const requestForProduct = (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const productName = req.body.productName;
    const cost = req.body.cost;
    const productCategory = req.body.productCategory;
    const location = req.body.location;
    const status = req.body.status;
    const owner = req.body.owner;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', 'gif'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 20000000) return res.status(422).json({ msg: "Image must be less than 20 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({
                productName: productName,
                cost: cost,
                productCategory: productCategory,
                location: location,
                status: status,
                owner: owner,
                image: fileName,
                url: url,

                userId: req.userId
            });
            res.status(201).json({ msg: "Product Created Successfully" });
        } catch (error) {
            console.log(error.message);
        }
    })

}


export const deleteProduct = async (req, res) => {
    const user = await Product.findOne({
        where: {
            uid: req.params.uid
        }
    });
    if (!user) return res.status(404).json({ msg: "Sorry, But the in does no exit" });
    try {
        await Product.destroy({
            where: {
                uid: req.params.uid
            }
        });
        res.status(200).json({ msg: "Request deleted Successfully" })
    } catch (error) {
        res.status(400).json({ msg: error.message })
        console.log(error)
    }
}