const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
};
exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error saving user")
  }
  
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid Email or Password");
    }
    const token = jwt.sign({ user_id: user._id }, "secret_token", {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (err) {
    console.error(err);
  }
};
