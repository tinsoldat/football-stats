<script setup lang="ts">
const route = useRoute()
const id = computed(() => Number(route.params.id))
const { data } = useTeam(id)
</script>

<template>
  <template v-if="data">
    <hgroup>
      <h1>Team: {{ data.name }} ({{ data.founded }})</h1>
      <img :src="data.crest" alt="crest" />
    </hgroup>
    <h2 id="details">
      Details
      <NuxtLink to="#details">#</NuxtLink>
    </h2>
    <ul>
      <li>aka: {{ [data.shortName, data.tla].filter(Boolean).join(', ') }}</li>
      <li>
        {{ data.area?.name }}
        <img v-if="data.area?.flag" class="flag" :src="data.area?.flag" />
      </li>
      <li>
        Coach:
        <NuxtLink v-if="data.coach" :to="`/persons/${data.coach}`">
          {{ data.coach.name }}
        </NuxtLink>
        <template v-else>-</template>
      </li>
      <li>Market value: {{ data.marketValue || '-' }}</li>
      <li>Address: {{ data.address }}</li>
      <li>Venue: {{ data.venue }}</li>
      <li>
        <a :href="data.website">Official website {{ `\u{2197}` }}</a>
      </li>
      <li>Colors: {{ data.clubColors }}</li>
    </ul>
    <h2 id="running">Running</h2>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>type</th>
          <th>area</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.runningCompetitions" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }} ({{ row.code }})</td>
          <td>{{ row.type }}</td>
          <td>{{ row.area?.name || '-' }}</td>
        </tr>
      </tbody>
    </table>
    <h2 id="squad">
      Squad
      <NuxtLink to="#squad">#</NuxtLink>
    </h2>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>country</th>
          <th>position</th>
          <th>number</th>
          <th>DoB</th>
          <th>market value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.squad" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.nationality }}</td>
          <td>{{ row.position }}</td>
          <td>{{ row.shirtNumber ?? '-' }}</td>
          <td>{{ row.dateOfBirth }}</td>
          <td>{{ row.marketValue || '-' }}</td>
        </tr>
      </tbody>
    </table>
    <h2 id="staff">
      Staff
      <NuxtLink to="#staff">#</NuxtLink>
    </h2>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>nationality</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.staff" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.nationality }}</td>
        </tr>
      </tbody>
    </table>
    <span>Last update: {{ data.lastUpdated }}</span>
  </template>
</template>

<style scoped>
.flag {
  display: inline;
  height: 1rem;
}
</style>
