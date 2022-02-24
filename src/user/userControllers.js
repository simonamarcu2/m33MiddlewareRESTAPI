const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

exports.hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unsuccessful, please check logs" });
  }
};

exports.decryptPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (await bcrypt.compare(req.body.password, user.password)) {
      req.user = user;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Unsuccessful, please check logs" });
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};
