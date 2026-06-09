import { expect, test } from '@playwright/test'

test.describe('auth flow', () => {
  test('redirects guests to login and unlocks protected routes after sign in', async ({
    page
  }) => {
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          code: 0,
          message: 'success',
          data: {
            accessToken: 'demo-access-token',
            user: {
              id: 'u_1',
              name: 'Demo Admin',
              email: 'admin@example.com',
              roles: ['admin']
            }
          }
        })
      })
    })

    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)

    await page.getByLabel('Email').fill('admin@example.com')
    await page.getByLabel('Password').fill('ChangeMe123!')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await expect(page).toHaveURL(/\/dashboard/)
    await expect(page.getByText('Dashboard')).toBeVisible()

    await page.goto('/admin/users')
    await expect(page.getByText('User administration')).toBeVisible()
  })
})
