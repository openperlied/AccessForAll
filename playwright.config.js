import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['./tests/report.js']],
  use: { browserName: 'chromium', channel: process.env.ACCESSFORALL_BROWSER || undefined },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1280, height: 800 } } },
    { name: 'narrow', use: { viewport: { width: 390, height: 844 } } }
  ]
});
