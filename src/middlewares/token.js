const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { generateError } = require('../api/utils/generateResponse');

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization === 'undefined')
        return generateError(res, StatusCodes.UNAUTHORIZED, {message: 'not authorized !'});
    if (!jwt.verify(authorization, process.env.TOKEN_SECRET))
        return generateError(res, StatusCodes.UNAUTHORIZED, {message: 'not authorized !'});
    next();
}

module.exports = {
    validateToken
}