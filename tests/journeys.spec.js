import { test, expect } from '@playwright/test';
import { audit } from './audit.js';

const fixture = path => new URL('../demo/' + path, import.meta.url).href;

test('Volunteer shift search · original', async ({ page }, info) => {
  await page.goto(fixture('index.html'));
  await audit(page, info, 'directory', [['label', '#neighborhood'], ['button-name', 'button']]);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('textbox')).toBeFocused();
  await page.keyboard.type('Riverside');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button')).toBeFocused();
  await page.keyboard.press('Enter');
  const shifts = page.locator('li:visible');
  await expect(shifts).toHaveCount(1);
  await expect(shifts.first()).toContainText('Pack produce boxes');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.type('Unknown');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toContainText('No shifts found');
  await expect(shifts).toHaveCount(0);
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.press('Backspace');
  await page.keyboard.press('Enter');
  await expect(shifts).toHaveCount(3);
});

for (const version of ['original', 'repaired']) {
  test('Pantry pickup · ' + version, async ({ page }, info) => {
    await page.goto(fixture('pickup/' + version + '.html'));
    const original = version === 'original';
    const expected = original ? [['select-name', '#site']] : [];
    await audit(page, info, 'initial site', expected);
    const site = page.getByRole('combobox', { name: original ? '' : 'Pickup location', exact: true });
    await page.keyboard.press('Tab');
    await expect(site).toBeFocused();
    await expect(page.getByRole('heading', { name: 'Riverside Hall' })).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(site).toHaveValue('market');
    await expect(page.getByRole('heading', { name: 'Market Square' })).toBeVisible();
    await expect(page.locator('#instructions')).toContainText('clock tower');
    await audit(page, info, 'after changing site', expected);
    await expect(site).toBeFocused();
  });
}
