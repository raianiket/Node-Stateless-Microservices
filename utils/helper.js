const Constant = require('../utils/constant');

module.exports = {
    formatResponse : function (payload, status = Constant.HTTP_OK) {
        if(status === Constant.HTTP_OK){
            return {data: payload};
        }else{
            return { error: payload, status: status };
        }
    }
};
