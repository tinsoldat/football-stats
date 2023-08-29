interface Resource {
  id: number
  name: string
}

interface ListResult {
  count: number
  filters: object
}

interface Area {
  id: number
  name: string
  countryCode?: string
  code: string
  flag: string | null
  parentAreaId: number | null
  parentArea: string
  childAreas: Area[]
}

interface Areas {
  count: number
  filters: object
  areas: Omit<Area, 'childAreas'>[]
}

type PartialArea = Pick<Area, 'id' | 'name' | 'code' | 'flag'>

interface Competition {
  area?: PartialArea
  id: number
  name: string
  code: string
  plan: string
  type: string
  emblem: string
  currentSeason: Season
  seasons: Season[]
  numberOfAvailableSeasons?: number
  lastUpdated: Date
}

interface Competitions {
  competitions: Competition[]
}

type PartialCompetition = Pick<
  Competition,
  'id' | 'name' | 'code' | 'type' | 'emblem'
>

interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchday: number | null
  winner: Person | null
  stages: string[]
}

interface CompetitionStandings {
  area?: PartialArea
  competition: PartialCompetition
  season: Season
  standings: {
    stage: string
    type: string
    group: null
    table: Standing[]
  }[]
}

interface Standing {
  stage: string
  type: string
  group: null | unknown
  table: []
}

interface StandingTableRow {
  position: number
  team: Pick<Team, 'id' | 'name' | 'shortName' | 'tla' | 'crest'>
  playedGames: number
  form: string
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalsDifference: number
}

interface CompetitionMatches {
  filters: object
  resultSet: ResultSet
  matches: Match[]
}

interface ResultSet {
  count: number
  competitions: string
  first: string
  last: string
  played: number
  wins: number
  draws: number
  losses: number
}

interface CompetitionTeams {}

interface CompetitionScorers {}

interface Match {
  area?: PartialArea
  competition: PartialCompetition
  season: Season
  id: number
  utcDate: string
  status: string
  minute: number
  injuryTime: number
  attendance: number
  venue: string
  matchday: number
  stage: string
  group: null
  lastUpdated: string
  homeTeam: MatchTeam
  awayTeam: MatchTeam
  score: MatchScore
  goals: MatchGoal[]
  penalties: Penalty[]
  bookings: Booking[]
  substitutions: Substitution[]
  odds: {
    homeWin: number
    draw: number
    awayWin: number
  }
  referees: Referee[]
}

interface MatchTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  coach: {
    id: number
    name: string
    nationality: string
  }
  leagueRank: null | unknown
  formation: string
  lineup: Pick<Person, 'id' | 'name' | 'position' | 'shirtNumber'>[]
  bench: Pick<Person, 'id' | 'name' | 'position' | 'shirtNumber'>[]
  statistics: TeamStatistics
}

interface TeamStatistics {
  corner_kicks: number
  free_kicks: number
  goal_kicks: number
  offsides: number
  fouls: number
  ball_possession: number
  saves: number
  throw_ins: number
  shots: number
  shots_on_goal: number
  shots_off_goal: number
  yellow_cards: number
  yellow_red_cards: number
  red_cards: number
}

interface MatchScore {
  winner: string
  duration: string
  fullTime: {
    home: number | null
    away: number | null
  }
  halfTime: {
    home: number | null
    away: number | null
  }
}

interface MatchGoal {
  minute: number
  injuryTime: null
  type: string
  team: Pick<Team, 'id' | 'name'>
  scorer: Pick<Person, 'id' | 'name'>
  assist: null | unknown
  score: {
    home: number
    away: number
  }
}

interface Penalty {
  player: {
    id: number
    name: string
  }
  team: {
    id: null
    name: null
  }
  scored: boolean
}

interface Booking {
  minute: number
  team: {
    id: number
    name: string
  }
  player: {
    id: number
    name: string
  }
  card: string
}

interface Substitution {
  minute: number
  team: {
    id: number
    name: string
  }
  playerOut: {
    id: number
    name: string
  }
  playerIn: {
    id: number
    name: string
  }
}

interface Referee {
  id: number
  name: string
  type: string
  nationality: string
}

interface Team {
  area?: PartialArea
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
  address: string
  website: string
  founded: number
  clubColors: string
  venue: string
  runningCompetitions?: Competition[]
  coach?: TeamCoach
  marketValue: number | null
  squad?: TeamPlayer[]
  staff?: TeamStaff[]
  lastUpdated: string
}

interface Teams {
  count: number
  teams: Team[]
}

interface Competition {
  id: number
  name: string
  code: string
  type: string
  emblem: string
}

interface TeamCoach {
  id: number
  firstName: string
  lastName: string
  name: string
  dateOfBirth: string
  nationality: string
  contract: {
    start: string
    until: string
  }
}

interface TeamPlayer {
  id: number
  firstName: string
  lastName: string
  name: string
  position: string
  dateOfBirth: string
  nationality: string
  shirtNumber?: number
  marketValue: number | null
  contract: {
    start: string
    until: string
  }
}

interface TeamStaff {
  id: number
  firstName: string
  lastName: string
  name: string
  dateOfBirth: number
  nationality: string
  contract: {
    start: string
    until: string
  }
}

interface Person {
  id: number
  name: string
  firstName: string
  lastName: string
  dateOfBirth: string
  nationality: string
  position: string | null
  shirtNumber: string
  currentTeam: Team
}

interface PersonMatches {
  filters: object
  resultSet: {
    count: number
    competitions: string
    first: string
    last: string
  }
  aggregations: object
  person: Person
  matches: Match[]
}

interface Matches {
  filters: {}
  resultSet: {
    count: number
    competitions: string
    first: string
    last: string
    played: number
  }
  matches: Match[]
}

interface MatchHeadToHead {
  resultSet: {
    count: number
    competitions: string
    first: string
    last: string
  }
  aggregates: object
  matches: Match[]
}
