const { generateError, generateAjvError } = require('../utils/generateResponse');
const bcrypt = require('bcrypt');
const db = require('../../db');
const Ajv = require('ajv');

const ajv = new Ajv();
require("ajv-formats")(ajv);

const { verifySchema } = require('../validations');

const verifyValidate = ajv.compile(verifySchema)

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization == undefined || authorization !== process.env.LAUNCHER_SECRET)
        return generateError(res, 400, {message: 'Invalid Token !'});
    next();
}

const validateUser = async (req, res, next) => {
    if (req.method === 'POST' && !verifyValidate(req.body))
        return generateAjvError(res, ajv, verifyValidate);
    const { email, password } = req.body;
    const user = await db.User.findOne({attributes: ['uuid', 'password'], where: { email: email }});
    if (!user) return generateError(res, StatusCodes.NOT_FOUND, {error: 'user not found'});
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return generateError(res, StatusCodes.UNAUTHORIZED, 'invalid password');
    res.locals.user_uuid = user.uuid;
    next();
}

module.exports = {
    validateToken,
    validateUser
};