import { normalize, strings } from '@angular-devkit/core'

export const AnyToLowercase = (string: any) => {
  return String(string).toLowerCase
}

export const pathResolver = (path: string, category: string) => {
  if (path && category) {
    return `--path="${normalize(`${path}/${strings.dasherize(category)}`)}"`
  } else if (path && !category) {
    return `--path="${normalize(path)}"`
  } else {
    return `--path="${normalize(`${strings.dasherize(category)}`)}"`
  }
}
