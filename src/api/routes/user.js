const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Ajv = require('ajv');

const db = require('../../db');
const { validateToken } = require('../../middlewares/token');
const { userUpdateSchema } = require('../validations');
const { generateError, generateResponse, generateAjvError } = require('../utils/generateResponse');

const ajv = new Ajv();
require("ajv-formats")(ajv);

//Validation
const userUpdateValidate = ajv.compile(userUpdateSchema);

router.get('/token', validateToken, async (req, res) => {
    return generateResponse(res, StatusCodes.OK, {});
});

router.get('/data', validateToken, async (req, res) => {
    const { uuid } = jwt.decode(req.headers.authorization);

    if (!uuid) return generateError(res, StatusCodes.INTERNAL_SERVER_ERROR, 'cannot get a valid user uuid !');
    const user = await db.User.findOne({ attributes: ['email', 'username', 'description', 'birthday', 'country_code', 'discord_id', 'phone_number'], where: { uuid }});
    if (!user) return generateError(res, StatusCodes.NOT_FOUND, 'cannot find an user with this uuid');
    return generateResponse(res, StatusCodes.OK, {user});
})

router.put('/', validateToken, async (req, res) => {
    if (!userUpdateValidate(req.body))
        return generateAjvError(res, ajv, userUpdateValidate);
    const { uuid } = jwt.decode(req.headers.authorization);
    const { username, discordId, phoneNumber, description, birthday } = req.body;

    const isUpdated = await db.User.update({ username, description, discord_id: discordId, phone_number: phoneNumber, birthday }, {where: { uuid }});
    if (!isUpdated) return generateError(res, StatusCodes.INTERNAL_SERVER_ERROR, {error: 'cannot update user !'});
    return generateResponse(res, 200, {message: 'successfuly updated !'});
})

module.exports = router;