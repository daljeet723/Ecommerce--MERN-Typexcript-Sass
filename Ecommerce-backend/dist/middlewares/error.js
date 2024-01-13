//CUSTOM ERROR HANDLER FILE
export var errorMiddleware = function (err, req, res, next) {
    //If some error msg is passed in API it will show that mesg else it will show
    //Internal server Error
    //err.message = error.message || ""
    err.message || (err.message = "Internal Server Error");
    err.statusCode || (err.statusCode = 500);
    return res.status(400).json({
        success: false,
        message: err.message
    });
};
//Handle Try-Catch with arguments taken from controllerType in types.ts file.
//return call back function
export var TryCatch = function (func) {
    //these req, res, next arguments coming from API function
    return function (req, res, next) {
        return Promise.resolve(func(req, res, next)).catch(next);
        //catch(next) it will return error as we are sending error in next()
    };
};
