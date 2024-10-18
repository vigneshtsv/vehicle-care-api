 const asyncMiddleware = (fn) => {
    return(req,res,next) => {
        fn(req,res,next).catch(next);
    };
};

export const errorHandler =(statusCode,message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export default asyncMiddleware;