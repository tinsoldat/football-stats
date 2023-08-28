export const useBaseFetch: typeof useFetch = (request, opts) => {
  const config = useRuntimeConfig()
  return useFetch(request, {
    headers: { 'X-Auth-Token': config.public?.apiKey, ...opts?.headers },
    ...opts,
    baseURL: config.public?.baseURL as string | undefined,
  })
}
export function useArea(id: Ref<number>) {
  return useBaseFetch<Area>(computed(() => `/areas/${id.value}`))
}
export function useAreas() {
  return useBaseFetch<Areas>(`/areas/`)
}
export function useCompetition(id: Ref<number>) {
  return useBaseFetch<Competition>(computed(() => `/competitions/${id.value}`))
}
export function useCompetitions(params: Ref<{ areas: number[] }>) {
  console.log(params)
  return useBaseFetch<Competitions>(`/competitions`, { params })
}
export function useCompetitionStandings(
  id: Ref<number>,
  params: Ref<{ matchday: number; season: number; date: Date }>
) {
  return useBaseFetch<CompetitionStandings>(
    computed(() => `competitions/${id.value}/standings`),
    {
      params,
    }
  )
}
export function useCompetitionMatches(
  id: Ref<number>,
  params: Ref<{
    dateFrom: Date
    dateTo: Date
    stage: string[]
    status: string[]
    matchday: number
    group: string
    season: number
  }>
) {
  return useBaseFetch<CompetitionMatches>(
    computed(() => `competitions/${id.value}/matches`),
    {
      params,
    }
  )
}
export function useCompetitionTeams(
  id: Ref<number>,
  params: Ref<{ season: number }>
) {
  return useBaseFetch<CompetitionTeams>(
    computed(() => `/competitions/${id.value}/teams`),
    {
      params,
    }
  )
}
export function useCompetitionScorers(
  id: Ref<number>,
  params: Ref<{ limit: number; season: number }>
) {
  return useBaseFetch<CompetitionScorers>(
    computed(() => `/competitions/${id.value}/scorers`),
    {
      params,
    }
  )
}
export function useTeam(id: Ref<number>) {
  return useBaseFetch<Team>(computed(() => `/teams/${id.value}`))
}
export function useTeams(params: Ref<{ limit: number; offset: number }>) {
  return useBaseFetch<Teams>(`/teams`, { params })
}
export function useTeamMatches(
  id: Ref<number>,
  params: Ref<{
    dateFrom: Date
    dateTo: Date
    season: number
    competitions: number[]
    status: string
    venue: string
    limit: number
  }>
) {
  return useBaseFetch<Matches>(
    computed(() => `/teams/${id.value}/matches`),
    { params }
  )
}
export function usePerson(id: Ref<number>) {
  return useBaseFetch<Person>(computed(() => `/persons/${id.value}`))
}
export function usePersonMatches(
  id: Ref<number>,
  params: Ref<{
    dateFrom: Date
    dateTo: Date
    status: string
    competitions: number[]
    limit: number
    offset: number
  }>
) {
  return useBaseFetch<PersonMatches>(
    computed(() => `/persons/${id.value}/matches`),
    { params }
  )
}
export function useMatch(id: Ref<number>) {
  return useBaseFetch<Match>(computed(() => `/matches/${id.value}`))
}
export function useMatches(
  params: Ref<{
    competitions: number[]
    ids: number[]
    dateFrom: Date
    dateTo: Date
    status: string
  }>
) {
  return useBaseFetch<Matches>(`/matches/`, { params })
}
export function useMatchHeadToHead(
  id: Ref<number>,
  params: Ref<{
    limit: number
    dateFrom: Date
    dateTo: Date
    competitions: number[]
  }>
) {
  return useBaseFetch<MatchHeadToHead>(
    computed(() => `/matches/${id.value}/head2head`),
    {
      params,
    }
  )
}
