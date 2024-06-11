import ZetaboardApiError from '.'

class UnauthorizedError extends ZetaboardApiError {
  constructor(message: string) {
    super(message, 401, 'missing-authorization')
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError)
    }
  }
}

export default UnauthorizedError
