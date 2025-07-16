// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';

test('test technique', async ({ page }) => {
  await page.goto('https://www.welcometothejungle.com/fr/me/profile');
  const modalContentHome = page.getByTestId('modal-content-home');
  await expect(modalContentHome).toBeVisible();
  await page.getByTestId('session-tab-login').click()
  await page.getByTestId('login-field-email').fill('izer1013@gmail.com')
  await page.getByTestId('login-field-password').fill('testyoussef1992')
  await page.getByTestId('login-button-submit').click()
  const finalizeProfileCloseModal = page.getByTestId('finalize-profile-close-modal');
  await page.addLocatorHandler(finalizeProfileCloseModal, async () => {
    await page.getByTestId('finalize-profile-close-modal').click()
    });
  const profileInformationBlock = page.getByTestId('profile-information-block');
  await expect(profileInformationBlock).toBeVisible();
  await page.getByTestId('edit-profile-information-button').click()
  const modalAccountEdit = page.getByTestId('modals');
  await expect(modalAccountEdit).toBeVisible();
  await page.locator("//*[@data-testid='account-edit-field-avatar']//input").setInputFiles(path.join('avatar.png'));
  await page.getByTestId('account-edit-button-submit').click()
  const profilePicture = page.locator("//*[@data-testid='block_item_photo-de-profil']//img");
  await expect(profilePicture).toBeVisible();
});
