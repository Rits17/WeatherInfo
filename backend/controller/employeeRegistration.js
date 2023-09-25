const userModel = require('../models/Employee')
const bcrypt = require("bcryptjs");

const handleNewEmployee = async (req, res) => {

    const { user, pwd } = req.body;
    // check if userName or password is none
    if (!user || !pwd) {
        return res.status(400).json({ "message": "Username and Password is required" });
    }
    // check if username exists in db
    const existingUser = await userModel.findOne({ UserName: user });

    if (existingUser) {
        return res.status(409).send("User Name already exists")// conflict
    }
    // Save New user in db
    // hash the password
    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);

        const newUser = new userModel({
            UserName: user,
            Roles:{User:'user'},
            Password: hashedPassword
        })

        await newUser.save();

        res.status(201).send("Profile Created");
    }
    catch (err) {
        return res.status(500).send("Please try again");
    }
}

module.exports=handleNewEmployee