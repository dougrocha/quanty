import { atom } from 'jotai'

const dashboardDrawerAtom = atom<boolean>(false)

export const dashboardDrawerToggleAtom = atom<boolean, boolean | undefined>(
  get => get(dashboardDrawerAtom),
  (_get, set, val) =>
    set(dashboardDrawerAtom, val ?? !_get(dashboardDrawerAtom)),
)

const dashboardDrawerShinkAtom = atom<boolean>(false)

export const dashboardDrawerShinkToggleAtom = atom<
  boolean,
  boolean | undefined
>(
  get => get(dashboardDrawerShinkAtom),
  (_get, set, val) =>
    set(dashboardDrawerShinkAtom, val ?? !_get(dashboardDrawerShinkAtom)),
)
