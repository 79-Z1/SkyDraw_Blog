'use strict';
const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCode');

class ErrorResponse extends Error {
    constructor(message, statusCode) { 
        super(message);
        this.statusCode = statusCode;
    }
}

class BadrequestError extends ErrorResponse { 
    constructor(message = ReasonPhrases.BAD_REQUEST, statusCode = StatusCodes.BAD_REQUEST) {
        super(message, statusCode);
    }
}

class AuthFailurError extends ErrorResponse { 
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

class PaymentRequiredError extends ErrorResponse { 
    constructor(message = ReasonPhrases.PAYMENT_REQUIRED, statusCode = StatusCodes.PAYMENT_REQUIRED) {
        super(message, statusCode);
    }
}

class ForbiddenError extends ErrorResponse { 
    constructor(message = ReasonPhrases.FORBIDDEN, statusCode = StatusCodes.FORBIDDEN) {
        super(message, statusCode);
    }
}

class NotFoundError extends ErrorResponse { 
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND) {
        super(message, statusCode);
    }
}

class MethodNotAllowedError extends ErrorResponse { 
    constructor(message = ReasonPhrases.METHOD_NOT_ALLOWED, statusCode = StatusCodes.METHOD_NOT_ALLOWED) {
        super(message, statusCode);
    }
}

class NotAcceptableError extends ErrorResponse { 
    constructor(message = ReasonPhrases.NOT_ACCEPTABLE, statusCode = StatusCodes.NOT_ACCEPTABLE) {
        super(message, statusCode);
    }
}

class ProxyAuthenticationRequiredError extends ErrorResponse { 
    constructor(message = ReasonPhrases.PROXY_AUTHENTICATION_REQUIRED, statusCode = StatusCodes.PROXY_AUTHENTICATION_REQUIRED) {
        super(message, statusCode);
    }
}

class RequestTimeoutError extends ErrorResponse { 
    constructor(message = ReasonPhrases.REQUEST_TIMEOUT, statusCode = StatusCodes.REQUEST_TIMEOUT) {
        super(message, statusCode);
    }
}

class ConflictError extends ErrorResponse { 
    constructor(message = ReasonPhrases.CONFLICT, statusCode = StatusCodes.CONFLICT) {
        super(message, statusCode);
    }
}

class GoneError extends ErrorResponse { 
    constructor(message = ReasonPhrases.GONE, statusCode = StatusCodes.GONE) {
        super(message, statusCode);
    }
}

class LengthRequiredError extends ErrorResponse { 
    constructor(message = ReasonPhrases.LENGTH_REQUIRED, statusCode = StatusCodes.LENGTH_REQUIRED) {
        super(message, statusCode);
    }
}



module.exports = {
    ConflictError,
    BadrequestError,
    ForbiddenError,
    GoneError,
    LengthRequiredError,
    MethodNotAllowedError,
    NotAcceptableError,
    NotFoundError,
    PaymentRequiredError,
    ProxyAuthenticationRequiredError,
    RequestTimeoutError,
    AuthFailurError
};
