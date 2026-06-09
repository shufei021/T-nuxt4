<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'permission'],
  requiredRoles: ['admin']
})

useSeoMeta({
  title: 'Admin Users',
  description: 'Role-protected admin example page.'
})

const rows = [
  { name: 'Avery Johnson', role: 'admin', status: 'active' },
  { name: 'Morgan Lee', role: 'editor', status: 'active' },
  { name: 'Taylor Kim', role: 'viewer', status: 'pending' }
]
</script>

<template>
  <div class="container stack-lg">
    <section class="soft-panel stack-md">
      <p class="eyebrow">Admin only</p>
      <h2 class="page-title">User administration</h2>
      <p class="page-copy">
        This route demonstrates permission middleware. Users without the
        <code>admin</code> role receive a 403.
      </p>
    </section>

    <UCard class="soft-panel">
      <template #header>
        <div class="stack-md">
          <h3>Sample users</h3>
          <p class="page-copy">
            Swap this table with your real user list endpoint once the backend
            contract is ready.
          </p>
        </div>
      </template>

      <div class="stack-md">
        <div v-for="row in rows" :key="row.name" class="soft-panel">
          <div class="pill-list">
            <UBadge color="primary" variant="soft">{{ row.name }}</UBadge>
            <UBadge color="neutral" variant="subtle">{{ row.role }}</UBadge>
            <UBadge color="warning" variant="soft">{{ row.status }}</UBadge>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>
