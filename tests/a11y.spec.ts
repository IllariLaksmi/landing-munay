import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults } from "axe-core";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] as const;

const ROUTES = [
  "",
  "/about",
  "/programs",
  "/calendar",
  "/blog",
  "/blog/why-munay-exists",
  "/contact",
] as const;

const LOCALES = ["es", "en"] as const;

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;

type Scenario = {
  locale: (typeof LOCALES)[number];
  route: (typeof ROUTES)[number];
  device: keyof typeof VIEWPORTS;
};

const scenarios: Scenario[] = LOCALES.flatMap((locale) =>
  ROUTES.flatMap((route) =>
    (Object.keys(VIEWPORTS) as Array<keyof typeof VIEWPORTS>).map((device) => ({
      locale,
      route,
      device,
    })),
  ),
);

function formatViolations(
  violations: AxeResults["violations"],
  scenario: Scenario,
) {
  if (violations.length === 0) return "";

  const { width, height } = VIEWPORTS[scenario.device];
  const path = `/${scenario.locale}${scenario.route}`;

  const lines = [
    "",
    `✖ ${violations.length} accessibility violation(s) on ${path} (${scenario.device} ${width}×${height})`,
    "",
  ];

  for (const violation of violations) {
    lines.push(
      `• [${violation.impact ?? "unknown"}] ${violation.id}: ${violation.help}`,
    );
    lines.push(`  ${violation.helpUrl}`);

    for (const node of violation.nodes) {
      lines.push(`  → ${node.target.join(" ")}`);
      if (node.failureSummary) {
        lines.push(`    ${node.failureSummary.replaceAll("\n", "\n    ")}`);
      }
    }

    lines.push("");
  }

  return lines.join("\n");
}

for (const scenario of scenarios) {
  const path = `/${scenario.locale}${scenario.route}`;

  test(`WCAG 2.1 AA · ${path} · ${scenario.device}`, async ({ page }) => {
    await page.setViewportSize(VIEWPORTS[scenario.device]);
    await page.goto(path, { waitUntil: "domcontentloaded" });

    await expect(page.locator("html")).toHaveAttribute("lang", scenario.locale);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    const results = await new AxeBuilder({ page })
      .withTags([...WCAG_TAGS])
      .analyze();

    if (results.violations.length > 0) {
      console.error(formatViolations(results.violations, scenario));
    }

    expect(
      results.violations,
      formatViolations(results.violations, scenario),
    ).toEqual([]);
  });
}
