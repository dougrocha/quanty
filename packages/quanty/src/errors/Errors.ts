export abstract class CustomError extends Error {
  abstract statusCode: number
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  getStatusCode() {
    return this.statusCode
  }

  setStatusCode(statusCode: number) {
    this.statusCode = statusCode
  }
}

export class ConfigError extends CustomError {
  statusCode = 10
}

export class CommandVerificationError extends CustomError {
  statusCode = 15
}

export class ValidationError extends Error {
  private _data: unknown = {}

  constructor(message?: string, options?: ErrorOptions) {
    super(message || 'Validation failed', options)
    this.name = 'ValidationError'

    Error.captureStackTrace(this, this.constructor)
  }

  errorCode = 2000

  get data() {
    return this._data
  }

  set data(errorData: unknown) {
    this._data = errorData
  }
}
