<script setup lang="ts">
const route = useRoute()

const id = computed(() => Number(route.params.id))

const { data } = useMatch(id)
</script>

<template>
  <h1>
    Match:
    <NuxtLink :to="`/teams/${data?.homeTeam.id}`">
      {{ data?.homeTeam.name }}
    </NuxtLink>
    {{ data?.score.fullTime.home || '-' }} :
    {{ data?.score.fullTime.away || '-' }}
    <NuxtLink :to="`/teams/${data?.awayTeam.id}`">
      {{ data?.awayTeam.name }}
    </NuxtLink>
  </h1>
  <h2>Details</h2>
  <ul>
    <li>
      <NuxtLink :to="`/competitions/$${data?.competition.id}`">
        {{ data?.competition.name }}
      </NuxtLink>
    </li>
    <li>{{ data?.utcDate.slice(0, 10) }}</li>
    <li>{{ data?.status }}</li>
    <li>Venue: {{ data?.venue }}</li>
    <li>Stage: {{ data?.stage }}</li>
  </ul>
</template>
