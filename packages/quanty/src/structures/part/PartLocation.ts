import { basename, relative, sep } from 'path'

export class PartLocation {
  public readonly full: string

  public readonly root: string

  public constructor(full: string, root: string) {
    this.full = full
    this.root = root
  }

  public get relative(): string {
    return relative(this.root, this.full)
  }

  public get directories(): string[] {
    return this.relative.split(sep).slice(0, -1)
  }

  public get name(): string {
    return basename(this.full)
  }
}
