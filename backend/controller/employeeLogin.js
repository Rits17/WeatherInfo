const userModel = require('../models/Employee')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { refresh_token_secret, access_token_secret } = require('../config/secretTokenGenerator');


const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ "message": "Username and Password is required" });
    }
    // find the user 
    const existingUser = await userModel.findOne({ UserName: user });
    if (!existingUser) {
        return res.status(204).send("User Name does not exist");
    }
    // decrypt the hashed password and compare
    try {
        const isMatch = await bcrypt.compare(pwd, existingUser.Password);

        if (isMatch) {
            const roles = Object.values(existingUser.Roles);

            const refreshToken = jwt.sign({
                'user': existingUser.UserName
            }, refresh_token_secret, { expiresIn: '1d' });

            const accessToken = jwt.sign({
                'userInfo': {
                    'user': existingUser.UserName,
                    'roles': roles
                }
            }, access_token_secret, { expiresIn: '40s' });


            await userModel.updateOne({ _id: existingUser._id }, { refreshToken: refreshToken })
            res.cookie('jwt', refreshToken, { httpOnly: true,sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000  });
            res.status(200).json({roles ,accessToken });
        }
        else {
            res.status(400).json({ "message": "UserName or Password is incorrect" });
        }
    }
    catch (err) {
        return res.status(500).send("Please try again");
    }
}

module.exports = handleLogin