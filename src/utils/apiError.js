class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = "",
  ) { 
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.error = error;
    this.stack = stack;
    this.success = false;
    this.message = message;
  }
}

export { ApiError };