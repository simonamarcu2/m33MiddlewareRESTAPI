const bcrypt = require("bcrypt");

exports.hashPass = async (req, res, next) => {
  try {
    // const tempPass = req.body.pass;
    // const hashedPass = await bcrypt.hash(tempPass, 8);
    // req.body.pass = hashedPass
    const salt = await bcrypt.genSalt(8);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};
