const Jimp = require('jimp');
const Constant = require('../../utils/constant');
const Logger = require('../../utils/logger');
const AppHelper = require('../../utils/helper');
const file = require('../../utils/file');
const path  = require('path');
 const logger = new Logger('Controller');

class ImageController {
    /**
     * This method resize and returns an image thumbnail.
     * @param {object} req - The request object. This contains a property called 'query'.
     * This query property is an object that contains another object, 'image'. It has a format
     * { image: 'https://www.openuped.eu/images/badge/icons/anywhere-online.png' }
     * @param {object} res - The response object
     * @param {function} next - The next middleware to be called, if any
     */
    static generateThumbnail(req, res, next) {
        if (! req.query.image) return res.status(Constant.HTTP_BAD_REQUEST).json(AppHelper.formatResponse("No image URL found", Constant.HTTP_BAD_REQUEST));
        //get Image extension...
        const imgExt = [...req.query.image.split('.')].pop();
        let filePath = `${file.getBaseDirPath(__dirname)}/_thumbnails_/${Date.now()}.${imgExt}`;
        Jimp.read(req.query.image)
            .then((lenna) => {
                lenna.resize(Constant.IMAGE_RESIZE, Constant.IMAGE_RESIZE)
                    .write(filePath, () => {
                        return res.sendFile(filePath);
                    });
            })
            .catch((err) => {
                logger.error(err);
                res.status(Constant.HTTP_BAD_REQUEST).json(AppHelper.formatResponse('An error occurred while resizing image. Please try again', Constant.HTTP_BAD_REQUEST));
            });
    }
}

module.exports = ImageController;
