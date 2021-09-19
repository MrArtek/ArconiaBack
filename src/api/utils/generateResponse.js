const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
};

const JSON_HEADERS = {
    ...CORS_HEADERS,
    'Content-Type': 'application/json',
};

const generateResponse = (res, statusCode, data, headers = {}) => {
    return res.status(statusCode)
        .json({ status: 'ok', code: statusCode, data })
};

const generateError = (res, statusCode, message, headers = {}) => {
    return res.status(statusCode)
        .json({ status: 'error', code: statusCode, message })
};

const generateAjvError = (res, ajv, validate) => generateError(res, 500, ajv.errorsText(validate.errors));

module.exports = {
    generateResponse,
    generateError,
    generateAjvError,
};