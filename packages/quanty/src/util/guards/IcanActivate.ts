export interface CanActive {
  canActivate(context: unknown): boolean | Promise<boolean>
}
