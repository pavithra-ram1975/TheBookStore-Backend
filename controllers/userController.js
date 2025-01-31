const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching users")
  }
};
exports.addUser = async (req, res) => {
  // try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
    });
    await newUser.save();
    // res.send(newUser);
    res.status(201).json({msg:"User registered successfully"})
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send("Error saving user")
  // }
  
};
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       res.status(400).json("Incorrect Email or Password");
//     }
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json("Invalid Email or Password");
//     }
//     const token = jwt.sign({ user_id: user._id }, "secret_token", {
//       expiresIn: "1d",
//     });
//     return res.status(200).json(token);
//   } catch (err) {
//     console.error(err);
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log("Login attempt with:", { email, password });
//   // try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found");
//       return res.status(400).json("Invalidd Email or Password");
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("Password mismatch");
//       return res.status(400).json("Invalid Email or Password");
//     }
//     const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     console.log("Login successful, token generated");
//     return res.status(200).json({ token });

  // } catch (err) {
  //   console.error("Error during login:", err);
  //   return res.status(500).json("Server Error");
  // }
// };
exports.login = async (req, res) => {
  // const { email, password } = req.body;
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("Incorrect Email or Password");
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json("Invalid  Password");
    // }
    const token = jwt.sign({ user_id: user._id }, "secret_token", {
      expiresIn: "1h",
    });
    return res.status(200).json({token:token});
  } catch (err) {
    console.error(err);
  }
};

