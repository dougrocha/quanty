export abstract class CustomError extends Error {
  abstract statusCode: number
  constructor(msg: string) {
    super(msg)
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  getErrorCode() {
    return this.statusCode
  }
}

export class ConfigError extends CustomError {
  statusCode = 10
}

export class CommandVerificationError extends CustomError {
  statusCode = 15
}
