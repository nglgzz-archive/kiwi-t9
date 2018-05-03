// Custom error for API.
class APIError extends Error {
  constructor(statusCode, ...params) {
    super(...params);

    // Mantain proper stack trace for where the error was thrown.
    Error.captureStackTrace(this, APIError);

    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

// In this function later on we could wire up something like Sentry to get
// notified when certain types of errors occur.
function logger(err, res) {
  // We have no response, the logger was called outside the scope of Express.
  if (!res) {
    console.log(err);
    return;
  }

  // If the error is an APIError and it was manually thrown, use the status code
  // specified, otherwise it's an internal error.
  if (err.name === 'APIError') {
    res.status(err.statusCode);
  } else {
    res.status(500);
  }

  console.log(`[${err.name}:${err.statusCode}] ${err.message}`);
  res.send({ error: err.message });
}


module.exports = {
  APIError,
  logger,
};
