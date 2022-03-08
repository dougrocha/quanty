export declare type Nullable<T> = {
  [P in keyof T]: T[P] | null
}

export declare type Optional<T> = {
  [P in keyof T]: T[P] | undefined
}
