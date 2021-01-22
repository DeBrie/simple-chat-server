
const BAD_REQUEST = 400,
	UNAUTHORISED = 401,
	PAYMENT_REQ = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	NOT_IMPLEMENTED = 501,
	INTERNAL_ERROR = 500;


class GeneralError extends Error {
	constructor(message) {
		super();
		this.message = message;
	}

	getCode() {
		if (this instanceof BadRequest)
			return BAD_REQUEST;
		if (this instanceof NotFound)
			return NOT_FOUND;
		if (this instanceof Unauthorised)
			return UNAUTHORISED;
		if (this instanceof PaymentReq)
			return PAYMENT_REQ;
		if (this instanceof Forbidden)
			return FORBIDDEN;
		if (this instanceof NotImplemented)
			return NOT_IMPLEMENTED;
		if (this instanceof InternalError)
			return INTERNAL_ERROR;

		return INTERNAL_ERROR;
	}
}

class BadRequest extends GeneralError { }
class NotFound extends GeneralError { }
class Unauthorised extends GeneralError { }
class PaymentReq extends GeneralError { }
class Forbidden extends GeneralError { }
class NotImplemented extends GeneralError { }
class InternalError extends GeneralError { }

module.exports = {
	GeneralError,
	BadRequest,
	NotFound,
	Unauthorised,
	PaymentReq,
	Forbidden,
	NotImplemented,
	InternalError
};