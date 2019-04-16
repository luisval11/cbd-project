exports.handleError = function (error, message) {
    const defaultMessage = "error.db";
    var dict;

    if (error !== null && error.name === "ValidationError") {
        const errors = error.errors;
        errors.error= message !== null ? message : defaultMessage;
        dict = {errors}
    } else
        dict = {errors: {error: message !== null ? message : defaultMessage}};

    return dict;

};
