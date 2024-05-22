import jwt from 'jsonwebtoken';
require('dotenv').config();

const nonSecurePaths = ['/api/logout', '/api/login', '/api/register'];

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN })
    } catch (error) {
        console.log(error)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error)
    }
    return decoded;
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    let cookies = req.cookies;

    if (cookies && cookies.token) {
        let token = cookies.token;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        }
        else {
            return res.status(401).json({
                errCode: -1,
                errMessage: 'Not authenticated the user'
            })
        }
    }
    else {
        return res.status(401).json({
            errCode: -1,
            errMessage: 'Not authenticated the user'
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT
}