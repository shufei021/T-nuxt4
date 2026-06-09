<script setup lang="ts">
const appStore = useAppStore()
const authStore = useAuthStore()
const runtimeConfig = useRuntimeConfig()
const { data, loading, errorMessage, fetchHealth } = useHealthCheck()

useSeoMeta({
  title: 'Home',
  description:
    'Nuxt 4 standard starter template for separated backend API projects.'
})

onMounted(() => {
  appStore.markReady()
})

const features = [
  {
    title: 'Separated API architecture',
    description:
      'Business APIs stay on the backend while the Nuxt client consumes them through one request layer.'
  },
  {
    title: 'Role-based access control',
    description:
      'Login, logout, route guards, and role-aware pages are ready for backend integration.'
  },
  {
    title: 'Quality automation',
    description:
      'Linting, formatting, unit tests, E2E tests, and CI/CD are included from day one.'
  }
]
</script>

<template>
  <div class="container home-page">
    <section class="hero">
      <div class="hero__content">
        <p class="eyebrow">Standard Template</p>
        <h2>
          A Nuxt 4 starter for teams working with a dedicated backend API.
        </h2>
        <p class="hero__desc">
          The frontend stays focused on views, state, and integration while the
          backend owns business services and data.
        </p>

        <div class="hero__actions">
          <button class="btn btn-primary" type="button" @click="fetchHealth">
            {{ loading ? 'Checking...' : 'Check backend health' }}
          </button>
          <NuxtLink
            class="btn btn-secondary"
            :to="authStore.isAuthenticated ? '/dashboard' : '/login'"
          >
            {{
              authStore.isAuthenticated ? 'Open dashboard' : 'Open login flow'
            }}
          </NuxtLink>
          <span class="badge"
            >API Base: {{ runtimeConfig.public.apiBase }}</span
          >
        </div>

        <div class="status-panel">
          <p>App ready: {{ appStore.appReady ? 'yes' : 'no' }}</p>
          <p>Latest API status: {{ appStore.lastHealthStatus }}</p>
          <p v-if="data">
            Backend payload: {{ data.status }} / {{ data.timestamp }}
          </p>
          <p v-if="errorMessage" class="text-danger">
            Request error: {{ errorMessage }}
          </p>
        </div>
      </div>
    </section>

    <section class="feature-grid">
      <FeatureCard
        v-for="feature in features"
        :key="feature.title"
        :title="feature.title"
        :description="feature.description"
      />
    </section>
  </div>
</template>
