const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
router.get("/users", userController.getUser);
router.post("/register", userController.addUser);
router.post("/", userController.login);


module.exports = router;
