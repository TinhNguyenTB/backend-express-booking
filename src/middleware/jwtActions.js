import jwt from 'jsonwebtoken';
require('dotenv').config();

const nonSecurePaths = ['/logout', '/login'];

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

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();

    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req);

    if ((cookies && cookies.token) || tokenFromHeader) {
        let token = cookies && cookies.token ? cookies.token : tokenFromHeader;
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