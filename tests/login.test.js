// tests/login.test.js
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://24slides.com';
const VALID_EMAIL = 'emailtest5711@gmail.com';
const VALID_PASSWORD = 'Email12345';

test.describe('Login Tests', () => {
  test('TC01 - Login sukses dengan email & password', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');

    // Tunggu sampai login terdeteksi melalui atribut
    await page.waitForFunction(() => {
      return document.body.getAttribute('data-is-user-logged')?.trim() === 'true';
    });

    const isLoggedIn = await page.getAttribute('body', 'data-is-user-logged');
    expect(isLoggedIn.trim()).toBe('true');
  });

  test('TC02 - Login gagal dengan email salah', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.fill('input[name="email"]', 'salah@example.com');
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page.getByText('Email atau password salah', { exact: false })).toBeVisible();
  });

  test('TC03 - Login gagal dengan password salah', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', 'salahpassword');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Email atau password salah', { exact: false })).toBeVisible();
  });

  test.skip('TC04 - Login dengan Google', async () => {
    // Skip karena perlu akun Google OAuth
  });

  test.skip('TC05 - Login dengan LinkedIn', async () => {
    // Skip karena perlu akun LinkedIn OAuth
  });

  test('TC07 - Unduh template setelah login', async ({ page }) => {
  await page.goto(BASE_URL + '/templates/featured');
  await page.getByRole('link', { name: /Login/i }).click();
  await page.fill('input[name="email"]', VALID_EMAIL);
  await page.fill('input[name="password"]', VALID_PASSWORD);
  await page.click('button[type="submit"]');

  // Tunggu login sukses
  await page.waitForFunction(() => {
    return document.body.getAttribute('data-is-user-logged')?.trim() === 'true';
  });

  // Kembali ke halaman template
  await page.goto(BASE_URL + '/templates/featured');
  await page.getByRole('button', { name: /Unduh/i }).click();
  await expect(page.locator('text=Unduhan dimulai')).toBeVisible();
});


  test('TC08 - Form login input kosong', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.click('button[type="submit"]');
    await expect(page.getByText('Email wajib diisi', { exact: false })).toBeVisible();
    await expect(page.getByText('Password wajib diisi', { exact: false })).toBeVisible();
  });

  test('TC10 - Login dengan akun tidak terdaftar', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.fill('input[name="email"]', 'tidakterdaftar@email.com');
    await page.fill('input[name="password"]', 'randompass123');
    await page.click('button[type="submit"]');
    await expect(page.getByText('akun tidak ditemukan', { exact: false })).toBeVisible();
  });
});
