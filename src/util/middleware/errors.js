
const { GeneralError } = require('../errors');

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
	  message: err.message || "Unspecified Error",
	  status: err.getCode()
    });
  }
  return res.status(500).json({
    status: 500,
    message: err.message || "Unsepcified Error"
  });
}


module.exports = handleErrors;