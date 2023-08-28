<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const query = computed(() => {
  const areas = route.query.areas ?? ''
  const arr =
    typeof areas === 'string' ? areas.split(',') : areas?.join().split(',')
  return { areas: arr.filter(v => /\d+/.test(v)).map(Number) }
})
const areas = useAreas()
const { data } = useCompetitions(query)

function onChange(e: Event) {
  const value = (e.target as HTMLSelectElement).value
  router.push({ query: { areas: value } })
}
</script>

<template>
  <h1>competitions</h1>
  <h2>filter</h2>
  <form>
    <select name="areas" id="areas" @change="onChange">
      <option
        v-for="area in areas.data.value?.areas"
        :key="area.id"
        :value="area.id"
      >
        {{ area.name }}
      </option>
    </select>
    <button type="reset">reset</button>
  </form>
  <h2>list</h2>
  <table>
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>code</th>
        <th>type</th>
        <th>plan</th>
        <th>area</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data?.competitions" :key="row.id">
        <td>{{ row.id }}</td>
        <td>
          <NuxtLink :to="`/competitions/${row.id}`">
            {{ row.name }}
          </NuxtLink>
        </td>
        <td>{{ row.code }}</td>
        <td>{{ row.type }}</td>
        <td>{{ row.plan }}</td>
        <td>{{ row.area.name }}</td>
      </tr>
    </tbody>
  </table>
</template>
