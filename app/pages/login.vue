<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: ['guest']
})

useSeoMeta({
  title: 'Login',
  description: 'Sign in page for the Nuxt 4 starter template.'
})

const route = useRoute()
const authStore = useAuthStore()
const form = reactive({
  email: 'admin@example.com',
  password: 'ChangeMe123!'
})
const pending = ref(false)
const errorMessage = ref('')

async function handleSubmit() {
  pending.value = true
  errorMessage.value = ''

  try {
    await authStore.login(form)
    const redirect =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : '/dashboard'
    await navigateTo(redirect)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Login failed'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="container stack-lg">
    <section class="auth-grid">
      <UCard class="soft-panel">
        <template #header>
          <div class="stack-md">
            <p class="eyebrow">Secure access</p>
            <h2 class="page-title">Login flow with backend-driven auth</h2>
            <p class="page-copy">
              This page posts credentials to the backend, stores the returned
              session, and unlocks protected routes.
            </p>
          </div>
        </template>

        <form class="stack-md" @submit.prevent="handleSubmit">
          <UFormField label="Email" name="email">
            <UInput
              v-model="form.email"
              type="email"
              placeholder="admin@example.com"
            />
          </UFormField>

          <UFormField label="Password" name="password">
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
            />
          </UFormField>

          <UAlert
            v-if="errorMessage"
            color="error"
            variant="soft"
            title="Login failed"
            :description="errorMessage"
          />

          <UButton
            type="submit"
            color="primary"
            size="xl"
            block
            :loading="pending"
          >
            Sign in
          </UButton>
        </form>
      </UCard>

      <div class="stack-md">
        <div class="soft-panel">
          <p class="eyebrow">Expected backend contract</p>
          <div class="stack-md">
            <p class="page-copy">POST <code>/auth/login</code></p>
            <p class="page-copy">
              Response: <code>{`{ code, message, data }`}</code>
            </p>
            <p class="page-copy">
              Session payload should include an access token and the current
              user roles.
            </p>
          </div>
        </div>

        <div class="soft-panel">
          <p class="eyebrow">Demo account</p>
          <p class="page-copy">
            The E2E suite intercepts this page with
            <code>admin@example.com</code> and grants the
            <code>admin</code> role.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
