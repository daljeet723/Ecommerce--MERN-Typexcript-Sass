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
//This is a higher-order function called TryCatch. 
//It takes another function func (assumed to be an asynchronous function) 
//and returns a new function that wraps the original function (func) in a try-catch block.
export var TryCatch = function (func) {
    return function (req, res, next) {
        return Promise.resolve(func(req, res, next)).catch(next);
        //If an error occurs inside the original function, 
        //it's caught by the catch block, and the next function is called with the error.
    };
};
//Stp by step working in learning file
