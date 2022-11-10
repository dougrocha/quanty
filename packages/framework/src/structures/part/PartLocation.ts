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

  /**
   * Defines the `JSON.stringify` behavior of this structure.
   */
  public toJSON(): PartLocationJSON {
    return {
      directories: this.directories,
      full: this.full,
      name: this.name,
      relative: this.relative,
      root: this.root,
    }
  }
}

/**
 * The return type of {@link PieceLocation.toJSON}.
 */
export interface PartLocationJSON {
  directories: string[]
  full: string
  name: string
  relative: string
  root: string
}
