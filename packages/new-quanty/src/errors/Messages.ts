export const Messages = {
  MISSING_CLIENT_CONFIG: (prop: any) =>
    `The ${prop} config option must be set.`,

  FILE_WITHOUT_EXPORTS: (path: string) =>
    `File: ${path} was exists but there was 0 exports.`,
}
