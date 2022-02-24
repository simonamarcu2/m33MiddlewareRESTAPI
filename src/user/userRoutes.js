const { Router } = require("express");
const { addUser, login } = require("./user.controllers");
const { hashPassword, decryptPassword, tokenCheck } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPassword, addUser);
userRouter.get("/token", tokenCheck, login);
userRouter.post("/login", decryptPassword, login);

module.exports = userRouter;
