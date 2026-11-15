import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AxeResults } from "axe-core";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] as const;

const NAV_COPY = {
  es: {
    mainNav: "Navegación principal",
    mobileNav: "Navegación móvil",
    openMenu: "Abrir menú de navegación",
    groups: ["Inicio", "Nosotros", "Nuestros programas"],
    children: ["Nuestra historia", "Misión y visión", "Enfoque"],
  },
  en: {
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open navigation menu",
    groups: ["Home", "About Us", "Our Programs"],
    children: ["Our Story", "Mission and vision", "Approach"],
  },
} as const;

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

for (const locale of LOCALES) {
  const copy = NAV_COPY[locale];

  test(`Navigation dropdowns · /${locale} · desktop`, async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    const mainNav = page.getByRole("navigation", { name: copy.mainNav });
    const triggers = mainNav.getByRole("button");
    await expect(triggers).toHaveCount(3);

    // Hover opens the group and links to the right in-page anchor.
    await mainNav
      .getByRole("link", { name: copy.groups[0], exact: true })
      .hover();
    const firstChild = mainNav.getByRole("link", {
      name: copy.children[0],
      exact: true,
    });
    await expect(firstChild).toBeVisible();
    await expect(firstChild).toHaveAttribute("href", `/${locale}#our-story`);

    await page.mouse.move(0, 0);
    await expect(firstChild).toBeHidden();

    // Focus opens the group, Escape closes it and restores focus.
    const trigger = triggers.nth(1);
    await trigger.focus();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const secondChild = mainNav.getByRole("link", {
      name: copy.children[1],
      exact: true,
    });
    await expect(secondChild).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags([...WCAG_TAGS])
      .analyze();

    expect(results.violations).toEqual([]);

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });

  test(`Navigation accordion · /${locale} · mobile`, async ({ page }) => {
    await page.setViewportSize(VIEWPORTS.mobile);
    await page.goto(`/${locale}`, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: copy.openMenu }).click();

    const mobileNav = page.getByRole("navigation", { name: copy.mobileNav });
    const triggers = mobileNav.getByRole("button");
    await expect(triggers).toHaveCount(3);

    const trigger = triggers.nth(2);
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const child = mobileNav.getByRole("link", {
      name: copy.children[2],
      exact: true,
    });
    await expect(child).toBeVisible();
    await expect(child).toHaveAttribute(
      "href",
      `/${locale}/programs#approach`,
    );

    const results = await new AxeBuilder({ page })
      .withTags([...WCAG_TAGS])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
