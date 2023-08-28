<script setup lang="ts">
const params = reactive<{ areas: number[] }>({
  areas: [],
})
useBaseFetch('test')
// const areas = useAreas()
// const data = useCompetitions(params)
</script>

<template>
  <h1>competitions</h1>
  <form>
    <select name="areas" id="areas">
      <!-- <option v-for="area in areas.data.value?.areas" :value="area.id">
        {{ area.name }}
      </option> -->
    </select>
  </form>
</template>
