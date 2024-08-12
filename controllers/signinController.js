const usermodel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email });


        if (!user) {
            return res.json("user not found")
        } else {
            const isMatch = await bcrypt.compare(password, user.password);


            if (!isMatch) {
                return res.status(400).json("password didnt match")
            }
        }

        const token = jwt.sign({ userid: user._id }, "secret_token", { expiresIn: "1h" })
        res.status(200).json(token)

    }
    catch (err) {
        res.json(err)
    }
}
