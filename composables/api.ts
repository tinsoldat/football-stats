export const useBaseFetch: typeof useFetch = (request, opts) => {
  const config = useRuntimeConfig()
  return useFetch(request, {
    headers: { 'X-Auth-Token': config.public?.apiKey, ...opts?.headers },
    ...opts,
    baseURL: config.public?.baseURL as string | undefined,
  })
}
export function useArea(id: MaybeRef<number>) {
  return useBaseFetch<Area>(
    computed(() => `/areas/${isRef(id) ? id.value : id}`)
  )
}
export function useAreas() {
  return useBaseFetch<Areas>(`/areas/`)
}
export function useCompetition(id: MaybeRef<number>) {
  return useBaseFetch<Competition>(
    computed(() => `/competitions/${isRef(id) ? id.value : id}`)
  )
}
export function useCompetitions(
  params?: MaybeRef<undefined | Partial<{ areas: number[] }>>
) {
  return useBaseFetch<Competitions>(`/competitions`, { params })
}
export function useCompetitionStandings(
  id: MaybeRef<number>,
  params?: MaybeRef<
    undefined | Partial<{ matchday: number; season: number; date: string }>
  >
) {
  return useBaseFetch<CompetitionStandings>(
    computed(() => `competitions/${isRef(id) ? id.value : id}/standings`),
    {
      params,
    }
  )
}
export function useCompetitionMatches(
  id: MaybeRef<number>,
  params?: MaybeRef<
    | undefined
    | Partial<{
        dateFrom: string
        dateTo: string
        stage: string[]
        status: string[]
        matchday: number
        group: string
        season: number
      }>
  >
) {
  return useBaseFetch<CompetitionMatches>(
    computed(() => `competitions/${isRef(id) ? id.value : id}/matches`),
    {
      params,
    }
  )
}
export function useCompetitionTeams(
  id: MaybeRef<number>,
  params?: MaybeRef<undefined | Partial<{ season: number }>>
) {
  return useBaseFetch<CompetitionTeams>(
    computed(() => `/competitions/${isRef(id) ? id.value : id}/teams`),
    {
      params,
    }
  )
}
export function useCompetitionScorers(
  id: MaybeRef<number>,
  params?: MaybeRef<undefined | Partial<{ limit: number; season: number }>>
) {
  return useBaseFetch<CompetitionScorers>(
    computed(() => `/competitions/${isRef(id) ? id.value : id}/scorers`),
    {
      params,
    }
  )
}
export function useTeam(id: MaybeRef<number>) {
  return useBaseFetch<Team>(
    computed(() => `/teams/${isRef(id) ? id.value : id}`)
  )
}
export function useTeams(
  params?: MaybeRef<undefined | Partial<{ limit: number; offset: number }>>
) {
  return useBaseFetch<Teams>(`/teams`, { params })
}
export function useTeamMatches(
  id: MaybeRef<number>,
  params?: MaybeRef<
    | undefined
    | Partial<{
        dateFrom: string
        dateTo: string
        season: number
        competitions: number[]
        status: string
        venue: string
        limit: number
      }>
  >
) {
  return useBaseFetch<Matches>(
    computed(() => `/teams/${isRef(id) ? id.value : id}/matches`),
    { params }
  )
}
export function usePerson(id: MaybeRef<number>) {
  return useBaseFetch<Person>(
    computed(() => `/persons/${isRef(id) ? id.value : id}`)
  )
}
export function usePersonMatches(
  id: MaybeRef<number>,
  params?: MaybeRef<
    | undefined
    | Partial<{
        dateFrom: string
        dateTo: string
        status: string
        competitions: number[]
        limit: number
        offset: number
      }>
  >
) {
  return useBaseFetch<PersonMatches>(
    computed(() => `/persons/${isRef(id) ? id.value : id}/matches`),
    { params }
  )
}
export function useMatch(id: MaybeRef<number>) {
  return useBaseFetch<Match>(
    computed(() => `/matches/${isRef(id) ? id.value : id}`)
  )
}
export function useMatches(
  params?: MaybeRef<
    | undefined
    | Partial<{
        competitions: number[]
        ids: number[]
        dateFrom: string
        dateTo: string
        status: string
      }>
  >
) {
  return useBaseFetch<Matches>(`/matches/`, { params })
}
export function useMatchHeadToHead(
  id: MaybeRef<number>,
  params?: MaybeRef<
    | undefined
    | Partial<{
        limit: number
        dateFrom: string
        dateTo: string
        competitions: number[]
      }>
  >
) {
  return useBaseFetch<MatchHeadToHead>(
    computed(() => `/matches/${isRef(id) ? id.value : id}/head2head`),
    {
      params,
    }
  )
}
