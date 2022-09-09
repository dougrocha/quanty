import { Part } from '../part/Part'

export class Guard<O extends Guard.Options = Guard.Options> extends Part<O> {
  public constructor(context: Part.Context, options: O = {} as O) {
    super(context, { ...options, setConstructorName: true })
  }

  public canActivate?(context: unknown): boolean | Promise<boolean>
}

export type GuardOptions = Part.Options

export namespace Guard {
  export type Options = GuardOptions
  export type Context = Part.Context
}
