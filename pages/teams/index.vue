<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const query = computed(() => {
  const limit = Number(route.query.limit) || 12
  const offset = Number(route.query.offset) || 0
  return { limit, offset }
})
const { data } = useTeams(query)

function onPageSize(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  router.push({ query: { ...route.query, limit: value } })
}
</script>

<template>
  <h1>Teams</h1>
  <table v-if="data">
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>founded</th>
        <th>coach</th>
        <th>area</th>
        <th>market value</th>
        <th>members</th>
        <th>staff</th>
        <th>venue</th>
        <th>competitions</th>
        <th>{{ `\u{1F310}` }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data.teams" :key="row.id">
        <td>{{ row.id }}</td>
        <td>
          <NuxtLink :to="`/teams/${row.id}`">
            {{ row.name }}
            <img class="crest" v-if="row.crest" :src="row.crest" />
          </NuxtLink>
        </td>
        <td>{{ row.founded }}</td>
        <td>
          <NuxtLink v-if="row.coach" :to="`/persons/${row.coach.id}`">
            {{ row.coach.name }}
          </NuxtLink>
          <template v-else>-</template>
        </td>
        <td>{{ row.area?.name || '-' }}</td>
        <td>{{ row.marketValue ? '$' + row.marketValue : '-' }}</td>
        <td>{{ row.squad?.length || '-' }}</td>
        <td>{{ row.staff?.length || '-' }}</td>
        <td>{{ row.venue || '-' }}</td>
        <td>{{ row.runningCompetitions?.length || '-' }}</td>
        <td>
          <a v-if="row.website" :href="row.website">{{ `\u{2197}` }}</a>
          <template v-else>-</template>
        </td>
      </tr>
    </tbody>
  </table>
  <nav>
    <label for="page-size">Page size:</label>
    <select name="page-size" id="page-size" @change="onPageSize">
      <option value="12">12</option>
      <option value="24">24</option>
      <option value="48">48</option>
    </select>
    <NuxtLink :to="`/teams?limit=${query.limit}`">first</NuxtLink>
    <NuxtLink
      :to="`/teams?offset=${query.offset + query.limit}&limit=${query.limit}`"
      >prev</NuxtLink
    >
    <NuxtLink
      :to="`/teams?offset=${query.offset + query.limit}&limit=${query.limit}`"
      >next</NuxtLink
    >
    <NuxtLink
      :to="`/teams?offset=${Math.max(
        (data?.count || 0) - query.limit,
        0
      )}&limit=${query.limit}`"
      >last</NuxtLink
    >
  </nav>
  <pre>

    {{ JSON.stringify(data?.teams, null, 2) }}
  </pre>
</template>

<style scoped>
.crest {
  width: 1rem;
  aspect-ratio: 1;
}
</style>
