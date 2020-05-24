const jsonpatch = require('jsonpatch');
 const Constant = require('../../utils/constant');
const Logger = require('../../utils/logger');
const AppHelper = require('../../utils/helper');

const logger = new Logger('Controller');

class PatchController {
    /**
     * This method applied patch to the jsonObj in the request body
     * @param {object} req - The request object. This contains a property called 'body'.
     * Format of the request body {
     *      jsonObj: {"name": "Adeola",  "location": "Lagos"},
     *      patchObj: {"op": "replace", "path": "/name", "value": "Adebayo"}
     * }
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static applyPatch(req, res, next) {
        if (!req.body.jsonObj || !req.body.patchObj) {
            return res.status(Constant.HTTP_BAD_REQUEST).json(AppHelper.formatResponse('JSON Object and JSON Patch Object are both required', Constant.HTTP_BAD_REQUEST));
        }
        let jsonObj = req.body.jsonObj;
        let patchObj = req.body.patchObj;
        try {
            if (typeof jsonObj === 'string') jsonObj = JSON.parse(jsonObj);
            if (typeof patchObj === 'string') patchObj = JSON.parse(patchObj);
            res.json(AppHelper.formatResponse(jsonpatch.apply_patch(jsonObj, [ patchObj ])));
        } catch (e) {
            logger.error(e);
            res.status(400).json(AppHelper.formatResponse(`An error occurred while applying patch: ${e.message}`, Constant.HTTP_BAD_REQUEST));
         }
    }
}

module.exports = PatchController;
