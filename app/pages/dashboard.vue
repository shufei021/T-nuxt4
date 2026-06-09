<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

useSeoMeta({
  title: 'Dashboard',
  description: 'Protected dashboard page for authenticated users.'
})

const authStore = useAuthStore()
const runtimeConfig = useRuntimeConfig()

const dashboardStats = [
  {
    label: 'API base',
    value: runtimeConfig.public.apiBase
  },
  {
    label: 'Active roles',
    value: authStore.user?.roles.join(', ') || 'none'
  },
  {
    label: 'Protected route',
    value: 'enabled'
  }
]
</script>

<template>
  <div class="container stack-lg">
    <section class="soft-panel stack-md">
      <p class="eyebrow">Protected area</p>
      <h2 class="page-title">Dashboard</h2>
      <p class="page-copy">
        Logged-in users land here after authentication. Use this page as the
        base layout for internal modules.
      </p>
      <div class="pill-list">
        <span class="badge badge-primary">{{
          authStore.user?.name || 'Unknown user'
        }}</span>
        <span class="badge badge-neutral">{{
          authStore.user?.email || 'No email'
        }}</span>
      </div>
    </section>

    <section class="dashboard-grid">
      <article
        v-for="item in dashboardStats"
        :key="item.label"
        class="soft-panel"
      >
        <div class="kpi">
          <span class="eyebrow">{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </div>
      </article>
    </section>
  </div>
</template>
