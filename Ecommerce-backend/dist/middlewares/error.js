//CUSTOM ERROR HANDLER FILE
export var errorMiddleware = function (err, req, res, next) {
    //If some error msg is passed in API it will show that mesg else it will show
    //Internal server Error
    //err.message = error.message || ""
    err.message || (err.message = "Internal Server Error");
    return res.status(400).json({
        success: false,
        message: err.message
    });
};
