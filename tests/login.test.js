// tests/login.test.js
const { test, expect } = require('@playwright/test'); 

const BASE_URL = 'https://24slides.com';
const VALID_EMAIL = 'emailtest5711@gmail.com';
const VALID_PASSWORD = 'Email12345';

test.describe('Login Tests', () => {
  test('TC01 - Login sukses dengan email & password', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForSelector('input[name="email"]');
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Dashboard', { exact: false })).toBeVisible();
  });

  test('TC02 - Login gagal dengan email salah', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForSelector('input[name="email"]');
    await page.fill('input[name="email"]', 'salah@example.com');
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await expect(page.getByText('Email atau password salah', { exact: false })).toBeVisible();
  });

  test('TC03 - Login gagal dengan password salah', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForSelector('input[name="email"]');
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', 'salahpassword');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Email atau password salah', { exact: false })).toBeVisible();
  });

  test.skip('TC04 - Login dengan Google', async ({ page }) => {
    // Skipped karena memerlukan akun test Google OAuth
  });

  test.skip('TC05 - Login dengan LinkedIn', async ({ page }) => {
    // Skipped karena memerlukan akun test LinkedIn OAuth
  });

  test('TC08 - Form login input kosong', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');
    await expect(page.getByText('Email wajib diisi', { exact: false })).toBeVisible();
    await expect(page.getByText('Password wajib diisi', { exact: false })).toBeVisible();
  });

  test('TC10 - Login dengan akun tidak terdaftar', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForSelector('input[name="email"]');
    await page.fill('input[name="email"]', 'tidakterdaftar@email.com');
    await page.fill('input[name="password"]', 'randompass123');
    await page.click('button[type="submit"]');
    await expect(page.getByText('akun tidak ditemukan', { exact: false })).toBeVisible();
  });
});

test.describe('Template Download Tests', () => {
  test('TC06 - Coba unduh tanpa login', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('button', { name: 'Unduh' }).click();
    await expect(page.getByText('Silakan login terlebih dahulu', { exact: false })).toBeVisible();
  });

  test('TC07 - Unduh template setelah login', async ({ page }) => {
    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.waitForSelector('input[name="email"]');
    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');

    await page.goto(BASE_URL + '/templates/featured');
    await page.getByRole('button', { name: 'Unduh' }).click();
    await expect(page.getByText('Unduhan dimulai', { exact: false })).toBeVisible();
  });
});
