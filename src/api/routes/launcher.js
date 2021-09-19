const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const { validateToken, validateUser } = require('../../middlewares/launcher')
const db = require('../../db');
const { v4: uuidV4 } = require('uuid');

const { generateError, generateResponse, generateAjvError } = require('../utils/generateResponse');

router.post('/verify', validateToken, validateUser, async (req, res) => {
    const uuid = res.locals.user_uuid;
    
    const actual = new Date();
    const infos = await db.LauncherInfos.findOne({attributes: ['last_login'], where: { user_uuid: uuid}});
    if (!infos) {
        await db.LauncherInfos.create({uuid: uuidV4(), user_uuid: uuid, last_login: actual});
    } else {
        infos.last_login = actual;
        await infos.save();
        await infos.reload();
    }
    return generateResponse(res, StatusCodes.OK, {date: actual});
})

router.get('/verify', validateToken, validateUser, async (req, res) => {
    const uuid = res.locals.user_uuid;

    const infos = await db.LauncherInfos.findOne({attributes: ['last_login'], where: { user_uuid: uuid}});
    if (!infos || infos.last_login == null)
        return generateError(res, StatusCodes.NOT_FOUND, {error: 'not found recent activity'})
    if (((new Date() - infos.last_login) / 1000) > 10)
        return generateError(res, StatusCodes.EXPECTATION_FAILED, 'cannot ping the server');
    return generateResponse(res, StatusCodes.OK, {date: infos.last_login})
})

module.exports = router;