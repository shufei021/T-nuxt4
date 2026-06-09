<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <div class="app-shell">
    <AppHeader :title="runtimeConfig.public.appTitle" />

    <main class="app-main">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
