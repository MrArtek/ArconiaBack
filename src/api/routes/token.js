const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');
const { validateToken } = require('../middlewares/token');
const { generateResponse } = require('../utils/generateResponse');

router.get('/', validateToken, async (req, res) => {
    return generateResponse(res, StatusCodes.OK, {});
})

module.exports = router;