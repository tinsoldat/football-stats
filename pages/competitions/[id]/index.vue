<script setup lang="ts">
const route = useRoute()
const _id = computed(() => id(route.params.id))
const { data, pending, error } = useCompetition(_id)
</script>

<template>
  <template v-if="data">
    <hgroup>
      <h1>league: {{ data.name }}</h1>
      <img
        class="emblem"
        v-if="data.emblem && data.emblem !== data.area?.flag"
        :src="data.emblem"
      />
      <img
        class="flag"
        v-if="data.area?.flag"
        :aria-label="data.area.code"
        :src="data.area.flag"
      />
    </hgroup>
    <h2 id="details">
      Details
      <NuxtLink to="#details">#</NuxtLink>
    </h2>
    <ul>
      <li>plan: {{ data.plan }}</li>
    </ul>
    <h2 id="current-season">
      Current season
      <NuxtLink to="current-season">#</NuxtLink>
    </h2>
    <ul>
      <li>Day {{ data.currentSeason.currentMatchday }}</li>
      <li>
        {{ data.currentSeason.startDate }} -
        {{ data.currentSeason.endDate }}
      </li>
      <li>
        Winner:
        <NuxtLink v-if="data.currentSeason.winner">
          {{ data.currentSeason.winner }}
        </NuxtLink>
        <template v-else>-</template>
      </li>
    </ul>
    <h2 id="seasons">
      Seasons
      <NuxtLink to="seasons">#</NuxtLink>
    </h2>
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>start</th>
          <th>end</th>
          <th>day</th>
          <th>winner</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data.seasons" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.startDate }}</td>
          <td>{{ row.endDate }}</td>
          <td>{{ row.currentMatchday }}</td>
          <td>
            <NuxtLink v-if="row.winner" :to="`/teams/${row.winner?.id}`">
              {{ row.winner?.name }}
            </NuxtLink>
            <template v-else>-</template>
          </td>
        </tr>
      </tbody>
    </table>
    <span>Last update: {{ data.lastUpdated }}</span>
  </template>
  <template v-if="pending"> Loading... </template>
  <template v-if="error"> An error occured: This is probably due to the API not allowing CORS. {{ String(error) }} </template>
</template>

<style scoped>
.emblem {
  height: 3rem;
}
.flag {
  height: 3rem;
}
</style>
