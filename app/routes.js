const {Router} = require('express');
/** {@link ../utils/middleware.js} */
const Middleware = require('../utils/middleware');
/** {@link controller.js} */
 const UserController = require('./controller/UserController');
const PatchController = require('./controller/PatchController');
const ImageController = require('./controller/ImageController');

const router = Router();

/** Authentication URL */
router.post('/login', Middleware.validateLoginPayload, UserController.authenticate);

/** JSON Patch URL */
router.patch('/apply-patch', Middleware.verifyToken, PatchController.applyPatch);

/** Image thumbnail URL */
router.get('/gen-thumbnail', Middleware.verifyToken, ImageController.generateThumbnail);

module.exports = { router };
