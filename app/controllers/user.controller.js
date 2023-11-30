const db = require('../models');
const bcrypt = require('bcryptjs');
const Op = db.Sequelize.Op;

const User = db.user;
const Role = db.role;

const userController = {};

userController.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles)
                    .then(() => {
                        res.status(201).send({
                            message: 'The user was registered successfully :)'
                        });
                    });
            });
        }
        else {
            user.setRoles([1])
                .then(() => {
                    res.status(201).send({
                        message: 'The user was registered successfully :)'
                    });
                });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

userController.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

userController.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

userController.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

userController.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

module.exports = userController;
