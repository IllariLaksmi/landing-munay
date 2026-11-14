import { defineConfig } from "@playwright/test";

const isCI = Boolean(process.env.CI);
const productionRun = process.env.PLAYWRIGHT_PRODUCTION === "1";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  outputDir: "test-results",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: productionRun ? "pnpm build && pnpm start" : "pnpm dev",
    url: "http://127.0.0.1:3000/es",
    reuseExistingServer: !isCI,
    timeout: 240_000,
  },
});
