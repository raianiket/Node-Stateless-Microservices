const { getToken } = require('../../utils/jwt');

class UserController {
    /**
     * This methos handles  users authentication using JWT
     * @param {object} req - The request object. This contains a property called 'body'.
     * This body property is an object in the format { username: 'username', password: 'password'}
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static authenticate(req, res, next) {
        let token = getToken(req.body);
        res.json(token);
    }
}

module.exports = UserController;
