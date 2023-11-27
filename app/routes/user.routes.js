const express = require('express');
const verifySignUp = require('../middleware/verifySignUp');
const authJWT = require('../middleware/authJWT');
const userController = require('../controllers/user.controller');

const userRouter = express();

userRouter.post(
    'api/user/signup',
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted]
    , userController.signup
);

userRouter.get('api/test/all', userController.allAccess);

userRouter.get(
    'api/test/user',
    authJWT.verifyToken,
    userController.userBoard
);

module.exports = userRouter;