const jwt = require('jsonwebtoken');
const { access_token_secret } = require('../config/secretTokenGenerator');


const verifyJwtToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1]; // Bearer <Token>
    try {
        const decoded = jwt.verify(token, access_token_secret);
        req.roles=decoded.userInfo.roles;
        next();
    }

    catch {
        res.status(403).send({ 'message': 'Forbidden' });
    }

}

module.exports=verifyJwtToken
