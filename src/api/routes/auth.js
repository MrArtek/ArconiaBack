const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const { loginSchema, registerSchema } = require('../validations');
const bcrypt = require('bcrypt');
const Ajv = require('ajv');
const db = require('../../db');
const { v4: uuidV4 } = require('uuid');
const jwt = require('jsonwebtoken');

const { generateError, generateResponse, generateAjvError } = require('../utils/generateResponse');
const ajv = new Ajv();
require("ajv-formats")(ajv);

const loginValidate = ajv.compile(loginSchema)
const registerValidate = ajv.compile(registerSchema)

router.post('/login', async (req, res) => {
    if (!loginValidate(req.body))
        return generateAjvError(res, ajv, loginValidate);
    const { email, password } = req.body;
    const user = await db.User.findOne({
        attributes: ['password', 'uuid'],
        where: { email: email }
    });
    if (!user) return generateError(res, StatusCodes.NOT_FOUND, {error: 'user not found'});
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return generateError(res, StatusCodes.UNAUTHORIZED, 'invalid password');
    return generateResponse(res, StatusCodes.ACCEPTED, {token: jwt.sign({uuid: user.uuid}, process.env.TOKEN_SECRET)})
});

router.post('/register', async (req, res) => {
    if (!registerValidate(req.body))
        return generateAjvError(res, ajv, loginValidate);
    const { email, password, username, phoneNumber, countryCode } = req.body;
    const user = await db.User.findOne({
        attributes: ['email', 'uuid'],
        where: { email: email}
    })
    if (user) return generateError(res, StatusCodes.CONFLICT, {error: 'user already exist'});
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const new_user = await db.User.create({uuid: uuidV4(), email, password: hashedPassword, username, phone_number: phoneNumber, country_code: countryCode});
    if (!new_user) return generateError(res, StatusCodes.NOT_ACCEPTABLE, {error: 'cannot add user'});
    return generateResponse(res, StatusCodes.CREATED, {token: jwt.sign({uuid: new_user.uuid}, process.env.TOKEN_SECRET)});
})

module.exports = router;