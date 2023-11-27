const express = require('express');
const authCrontroller = require('../controllers/auth.controller');

const authRouter = express();

authRouter.post('api/authentication/signin', authCrontroller.signin);

module.exports = authRouter;