const express = require('express');

const router = express.Router();

const authController = require("../../controllers/authController");
const accessTokenController = require("../../controllers/accessTokenController");

router.post("/register",authController.handleRegister);

router.post("/login",authController.handleLogin);

router.post("/logout",authController.handleLogout);

router.post("/accesstoken",accessTokenController.handleReissueAccessToken);

module.exports = router;