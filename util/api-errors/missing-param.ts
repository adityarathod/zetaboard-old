import ZetaboardApiError from '.'

class MissingParameterError extends ZetaboardApiError {
  constructor(message: string) {
    super(message, 400, 'missing-required-parameter')
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MissingParameterError)
    }
  }
}

export default MissingParameterError
