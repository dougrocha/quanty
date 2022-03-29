export const Messages = {
  MISSING_CLIENT_CONFIG: (prop: any) =>
    `The ${prop} config option must be set.`,

  FILE_WITHOUT_EXPORTS: (path: string) =>
    `File: ${path} was exists but there was 0 exports.`,

  // NOTE: Type is using new TS4.1 feature. As you can use template literals as types now.
  // This allows the type to use the value of the enums as string types
  INVALID_SLASH_NAME: (name: string, type: `${INVALID_SLASH_NAME_ENUM}`) =>
    `${name} has a invalid name. ${type}`,

  INVALID_SLASH_OPTION: (name: string, type: string) =>
    `Invalid Slash Option ${name}: ${type}`,

  EXPORT_INVALID: (file: string, type: string) =>
    `Will not load ${file}. This ${type} is not exported properly.`,
}

enum INVALID_SLASH_NAME_ENUM {
  INVALID_LENGTH = 'Must be between 1 and 32 in length.',
}
