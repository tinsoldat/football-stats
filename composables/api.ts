export const useBaseFetch: typeof useFetch = (request, opts) => {
  const config = useRuntimeConfig()
  console.log(config)
  return useFetch(request, {
    headers: { 'X-Auth-Token': config.public?.apiKey, ...opts?.headers },
    ...opts,
    baseURL: (config.public?.baseURL as string) || undefined,
  })
}
export function useArea(id: number) {
  return useBaseFetch<Area>(`/areas/${id}`)
}
export function useAreas() {
  return useBaseFetch<Areas>(`/areas/`)
}
export function useCompetition(id: number) {
  return useBaseFetch<Competition>(`/competitions/${id}`)
}
export function useCompetitions(params: { areas: number[] }) {
  return useBaseFetch<Competitions>(`/competitions`, { params })
}
export function useCompetitionStandings(
  id: number,
  params: { matchday: number; season: number; date: Date }
) {
  return useBaseFetch<CompetitionStandings>(`competitions/${id}/standings`, {
    params,
  })
}
export function useCompetitionMatches(
  id: number,
  params: {
    dateFrom: Date
    dateTo: Date
    stage: string[]
    status: string[]
    matchday: number
    group: string
    season: number
  }
) {
  return useBaseFetch<CompetitionMatches>(`competitions/${id}/matches`, {
    params,
  })
}
export function useCompetitionTeams(id: number, params: { season: number }) {
  return useBaseFetch<CompetitionTeams>(`/competitions/${id}/teams`, { params })
}
export function useCompetitionScorers(
  id: number,
  params: { limit: number; season: number }
) {
  return useBaseFetch<CompetitionScorers>(`/competitions/${id}/scorers`, {
    params,
  })
}
export function useTeam(id: number) {
  return useBaseFetch<Team>(`/teams/${id}`)
}
export function useTeams(params: { limit: number; offset: number }) {
  return useBaseFetch<Teams>(`/teams`, { params })
}
export function useTeamMatches(
  id: number,
  params: {
    dateFrom: Date
    dateTo: Date
    season: number
    competitions: number[]
    status: string
    venue: string
    limit: number
  }
) {
  return useBaseFetch<Matches>(`/teams/${id}/matches`, { params })
}
export function usePerson(id: number) {
  return useBaseFetch<Person>(`/persons/${id}`)
}
export function usePersonMatches(
  id: number,
  params: {
    dateFrom: Date
    dateTo: Date
    status: string
    competitions: number[]
    limit: number
    offset: number
  }
) {
  return useBaseFetch<PersonMatches>(`/persons/${id}/matches`, { params })
}
export function useMatch(id: number) {
  return useBaseFetch<Match>(`/matches/${id}`)
}
export function useMatches(params: {
  competitions: number[]
  ids: number[]
  dateFrom: Date
  dateTo: Date
  status: string
}) {
  return useBaseFetch<Matches>(`/matches/`, { params })
}
export function useMatchHeadToHead(
  id: number,
  params: {
    limit: number
    dateFrom: Date
    dateTo: Date
    competitions: number[]
  }
) {
  return useBaseFetch<MatchHeadToHead>(`/matches/${id}/head2head`, { params })
}
