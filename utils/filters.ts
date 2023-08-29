import type { LocationQueryValue } from '#vue-router'

type Value = LocationQueryValue | LocationQueryValue[]

export const id = (value: string | string[]) => Number(value)
export const ids = (value: Value) => {
  if (!value) return []
  return (typeof value === 'string' ? value : value.join())
    .split(',')
    .map(Number)
    .filter(Boolean)
}
// export const matchday = () => ()
// export const season = () => ()
// export const status = () => ()
// export const venue = () => ()
// export const date = () => ()
// export const dateFrom = () => ()
// export const dateTo = () => ()
// export const stage = () => ()
// export const plan = () => ()
// export const competitions = () => ()
// export const areas = () => ()
// export const group = () => ()
export const limit = (value: Value) => Number(value) || 12
export const offset = (value: Value) => Number(value) || 0
