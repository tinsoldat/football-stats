<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const query = useQueryFilter(route => ({
  limit: filters.limit(route.query.limit),
  offset: filters.offset(route.query.offset),
}))
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
  <nav id="pagination">
    <span
      >Showing {{ query.offset + 1 }} - {{ query.offset + query.limit }}</span
    >
    <label for="page-size">Page size:</label>
    <select name="page-size" id="page-size" @change="onPageSize">
      <option value="12">12</option>
      <option value="24">24</option>
      <option value="48">48</option>
    </select>
    <NuxtLink v-if="query.offset > 0" :to="`/teams?limit=${query.limit}`"
      >first</NuxtLink
    >
    <span v-else>first</span>
    <NuxtLink
      v-if="query.offset > 0"
      :to="`/teams?offset=${query.offset + query.limit}&limit=${query.limit}`"
      >prev</NuxtLink
    >
    <span v-else>prev</span>
    <NuxtLink
      :to="`/teams?offset=${query.offset + query.limit}&limit=${query.limit}`"
      >next</NuxtLink
    >
  </nav>
</template>

<style scoped>
.crest {
  width: 1rem;
  aspect-ratio: 1;
}

#pagination {
  display: flex;
  gap: 4px;
}
</style>
