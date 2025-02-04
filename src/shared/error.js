module.exports =  function (status, message, next){
    if(next){
        const error = new Error(message);
        error.status = status;
        next(error)
    }

    return {
        status: status,
        body: message
    }
}