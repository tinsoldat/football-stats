<script setup lang="ts"></script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/competitions">competitions</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/teams">teams</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/matches">matches</NuxtLink>
      </li>
    </ul>
    <main>
      <slot />
    </main>
  </nav>
</template>
