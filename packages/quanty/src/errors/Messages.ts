export const Messages = {
  MISSING_CLIENT_CONFIG: (prop: any) =>
    `The ${prop} config option must be set.`,

  FILE_WITHOUT_EXPORTS: (path: string) =>
    `File: ${path} was exists but there was 0 exports.`,

  INVALID_SLASH_OPTION: (name: string, type: string) =>
    `Invalid Slash Option ${name}: ${type}`,

  EXPORT_INVALID: (file: string, type: string) =>
    `Will not load ${file}. This ${type} is not exported properly.`,
}
