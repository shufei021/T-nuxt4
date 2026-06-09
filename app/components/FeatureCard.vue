<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>

<template>
  <article class="feature-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </article>
</template>
