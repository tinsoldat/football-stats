import type { LocationQueryValue } from '#vue-router'

type Value = LocationQueryValue | LocationQueryValue[]

const number = (value: Value) => Number(value) || undefined
const string = (value: Value) => (value ? String(value) : undefined)
const date = (value: Value) => {
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString().slice(0, 10) || undefined
}
const ids = (value: Value) => {
  if (!value) return undefined
  const array = (typeof value === 'string' ? value : value.join())
    .split(',')
    .map(Number)
    .filter(Boolean)
  if (!array.length) return undefined
  return array
}
export const statuses = [
  'SCHEDULED',
  'LIVE',
  'IN_PLAY',
  'PAUSED',
  'FINISHED',
  'POSTPONED',
  'SUSPENDED',
  'CANCELLED',
]

export const filters = {
  id: number,
  ids: ids,
  matchday: number,
  season: value => (/\d{4}/.test(String(value)) ? Number(value) : undefined),
  status: string,
  venue: string,
  date: date,
  dateFrom: date,
  dateTo: date,
  stage: string,
  plan: string,
  competitions: ids,
  areas: ids,
  group: string,
  limit: value => Number(value) || 12,
  offset: value => Number(value) || 0,
} satisfies Record<string, (value: Value) => unknown>
