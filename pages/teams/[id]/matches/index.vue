<script setup lang="ts">
const route = useRoute()
const teamId = Number(route.params.id)
const { data: team } = useTeam(teamId)
const query = useQueryFilter(route => {
  return {
    dateFrom: filters.dateFrom(route.query.dateFrom),
    dateTo: filters.dateTo(route.query.dateTo),
    season: filters.season(route.query.season),
    competitions: filters.competitions(route.query.competitions),
    status: filters.status(route.query.status),
    venue: filters.venue(route.query.venue),
    limit: filters.limit(route.query.limit),
  }
})

const { data: competitions } = useCompetitions()
const debounced = useDebounce(query)
const { data } = useTeamMatches(teamId, debounced)

function reset() {
  navigateTo({})
}
function onStatus(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  navigateTo({ query: { ...route.query, status: value || undefined } })
}
function onCompetition(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  navigateTo({ query: { ...route.query, competitions: value || undefined } })
}
function onSeason(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  navigateTo({ query: { ...route.query, season: value || undefined } })
}
function onDateFrom(e: Event) {
  const value = (e.target as HTMLInputElement).value
  const date = new Date(value)
  if (Number.isNaN(date.getTime)) return
  navigateTo({
    query: { ...route.query, dateFrom: date.toISOString().slice(0, 10) },
  })
}
function onDateTo(e: Event) {
  const value = (e.target as HTMLInputElement).value
  const date = new Date(value)
  if (Number.isNaN(date.getTime)) return
  navigateTo({
    query: { ...route.query, dateTo: date.toISOString().slice(0, 10) },
  })
}
</script>

<template>
  <h1>{{ team?.name }}: Matches</h1>
  <pre>
    {{ JSON.stringify(query, null, 2) }}
  </pre>
  <form id="filter" @reset="reset" @submit:prevent="">
    <label>
      status
      <select @change="onStatus">
        <option value=""></option>
        <option
          v-for="status in statuses"
          :selected="status === query.status"
          :value="status"
        >
          {{ status }}
        </option>
      </select>
    </label>
    <label>
      competition
      <select :value="query.competitions" @change="onCompetition">
        <option value=""></option>
        <option
          v-for="option in competitions?.competitions"
          :value="option.id"
          :selected="
            (console.log(option.id, query.competitions?.[0]),
            option.id === query.competitions?.[0])
          "
        >
          {{ option.name }}
        </option>
      </select>
    </label>
    <label>
      season
      <select :value="query.season" @change="onSeason">
        <option value=""></option>
        <option
          v-for="i in 50"
          :value="i + 1980"
          :selected="i + 1980 === query.competitions?.[0]"
        >
          {{ i + 1980 }}
        </option>
      </select>
    </label>
    <fieldset>
      <legend>date</legend>
      <input type="date" :value="query.dateFrom" @change="onDateFrom" />
      <input type="date" :value="query.dateTo" @change="onDateTo" />
    </fieldset>
    <button type="reset">Reset</button>
  </form>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>competition</th>
        <th>matchday</th>
        <th>stage</th>
        <th>opponent</th>
        <th>score</th>
        <th>status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data?.matches" :key="row.id">
        <th>
          <NuxtLink :to="`/matches/${row.id}`">
            {{ row.id }}
          </NuxtLink>
        </th>
        <th>
          <NuxtLink :to="`/competitions/${row.competition.id}`">
            {{ row.competition.name }}
          </NuxtLink>
        </th>
        <th>{{ row.matchday }}</th>
        <th>{{ row.stage }}</th>
        <th>
          <NuxtLink
            :to="`/teams/${
              row.homeTeam.id === teamId ? row.awayTeam.name : row.homeTeam.name
            }`"
          >
            {{
              row.homeTeam.id === teamId ? row.awayTeam.name : row.homeTeam.name
            }}
          </NuxtLink>
        </th>
        <th>
          {{
            row.homeTeam.id === teamId
              ? `${row.score.fullTime.home || '-'} : ${
                  row.score.fullTime.away || '-'
                }`
              : `${row.score.fullTime.home || '-'} : ${
                  row.score.fullTime.away || '-'
                }`
          }}
        </th>
        <th>{{ row.status }}</th>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
#filter {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 30rem;
}
</style>
