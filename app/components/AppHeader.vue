<script setup lang="ts">
const authStore = useAuthStore()

defineProps({
  title: {
    type: String,
    required: true
  }
})

async function handleLogout() {
  await authStore.logout()
}
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <div>
        <p class="eyebrow">Nuxt 4 Starter</p>
        <h1 class="brand">{{ title }}</h1>
      </div>

      <nav class="app-nav">
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <NuxtLink v-if="authStore.canAccess(['admin'])" to="/admin/users"
          >Admin</NuxtLink
        >
        <NuxtLink v-if="!authStore.isAuthenticated" to="/login">Login</NuxtLink>
        <button v-else class="nav-button" type="button" @click="handleLogout">
          Logout
        </button>
      </nav>
    </div>
  </header>
</template>
