class ZetaboardApiError extends Error {
  status: number
  constructor(message: string, status: number, name?: string) {
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZetaboardApiError)
    }
    this.name = name ?? 'unknown-error'
    this.status = status
  }
}

const isFirebaseAuthError = (err: { code: string }): boolean => {
  if (err.code) return err.code.startsWith('auth/')
  return false
}

export { isFirebaseAuthError }
export default ZetaboardApiError
