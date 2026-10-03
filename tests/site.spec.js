import { test as base, expect } from "@playwright/test";

const test = base.extend({
  page: async ({ page }, use) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await use(page);
    expect(errors, "Browser errors, including hydration errors").toEqual([]);
  },
});

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // This text is set by the demo initializer, after React hydration.
  await expect(page.locator("#archive-destination")).toContainText(
    "Desktop Archive /",
  );
});

test("renders content for crawlers and serves every local asset", async ({
  page,
  request,
}) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("Your files, with room to");
  expect(html).toContain('property="og:title"');
  await expect(page).toHaveTitle("Mereday · A little order, every day.");
  const assets = await page
    .locator("img[src], script[src], link[rel=stylesheet], link[rel=icon]")
    .evaluateAll((elements) => [
      ...new Set(elements.map((element) => element.src || element.href)),
    ]);
  for (const asset of assets)
    expect((await request.get(asset)).status(), asset).toBe(200);
  expect((await request.get("/missing-page/")).status()).toBe(404);
});

test("preview filters, organize, reports, receipts, and undo stay consistent", async ({
  page,
}) => {
  await page.locator('[data-kind="Images"]').click();
  await expect(page.locator("#preview-rows .preview-row")).toHaveCount(5);
  // Filtering the preview must not change which enabled files are organized.
  await expect(page.locator("#organize")).toHaveText("Organize 12 items");
  await page.locator("#organize").click();
  await expect(page.locator("#item-count")).toHaveText("All in place");
  await page.locator("#tab-reports").click();
  await expect(page.locator("#report-total")).toHaveText("12");
  await expect(page.locator("#desktop-total")).toHaveText("6");
  await expect(page.locator("#downloads-total")).toHaveText("6");
  await page.getByRole("button", { name: "This month", exact: true }).click();
  await expect(page.locator("#report-total")).toHaveText("12");
  await page.locator("#tab-receipts").click();
  await expect(page.locator(".receipt-card")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Show receipt details" })
    .first()
    .click();
  await expect(
    page.locator(".receipt-details:visible .preview-row"),
  ).toHaveCount(6);
  await page
    .getByRole("button", { name: "Undo remaining moves" })
    .first()
    .click();
  await page.locator("#tab-reports").click();
  await expect(page.locator("#report-total")).toHaveText("6");
  await page.locator("#tab-organize").click();
  await expect(page.locator("#organize")).toHaveText("Organize 6 items");
});

test("configuration changes sample destinations and limits enabled locations", async ({
  page,
}) => {
  await page.locator("#downloads-enabled").uncheck();
  await expect(page.locator("#organize")).toHaveText("Organize 6 items");
  await page.locator("#configure").click();
  await page.locator('[name="grouping"][value="Daily"]').check();
  await expect(page.locator("#archive-destination")).toHaveText(
    /Desktop Archive \/ \d{4}-\d{2}-\d{2}/,
  );
  await page.locator('[data-folder="archive"]').click();
  await page
    .locator("#sample-folder")
    .selectOption("Documents / Desktop Archive");
  await page.locator("#choose-sample-folder").click();
  await expect(page.locator("#folder-dialog")).not.toBeVisible();
  await expect(page.locator("#archive-destination")).toContainText(
    "Documents / Desktop Archive /",
  );
  await page.locator('[name="schedule"][value="Weekly"]').check();
  await expect(page.locator("#schedule-description")).toContainText("weekly");
  await page.locator("#organize").click();
  await expect(page.locator("#item-count")).toHaveText("All in place");
  await page.locator("#tab-receipts").click();
  await expect(page.locator(".receipt-card")).toHaveCount(1);
  await expect(page.locator(".receipt-info")).toContainText(
    "Documents / Desktop Archive /",
  );
});

test("repeated sessions paginate receipts without losing undo history", async ({
  page,
}) => {
  for (let index = 0; index < 3; index++) {
    await page.locator("#tab-organize").click();
    await page.locator("#organize").click();
    await expect(page.locator("#item-count")).toHaveText("All in place");
    await page.locator("#tab-receipts").click();
    if (index < 2) {
      // Undo the two newest receipts; older undone receipts remain in history.
      await page
        .locator(".receipt-card")
        .nth(0)
        .getByRole("button", { name: "Undo remaining moves" })
        .click();
      await page
        .locator(".receipt-card")
        .nth(1)
        .getByRole("button", { name: "Undo remaining moves" })
        .click();
    }
  }
  await expect(page.locator(".receipt-card")).toHaveCount(5);
  await page
    .getByRole("button", { name: "Next receipts page" })
    .first()
    .click();
  await expect(page.locator(".receipt-card")).toHaveCount(1);
  await expect(
    page
      .locator(".receipt-card")
      .getByRole("button", { name: "Undo remaining moves" }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Previous receipts page" })
    .first()
    .click();
  await expect(page.locator(".receipt-card")).toHaveCount(5);
});

test("keyboard tabs, appearance, download dialog, and FAQ work", async ({
  page,
}) => {
  await page.locator("#tab-organize").focus();
  await page.keyboard.press("End");
  await expect(page.locator("#tab-settings")).toBeFocused();
  await expect(page.locator("#panel-settings")).toBeVisible();
  await page.locator('[name="appearance"][value="Dark"]').check();
  await expect(page.locator("#app-shell")).toHaveClass(/dark/);
  await page.locator('[name="appearance"][value="Light"]').check();
  await expect(page.locator("#app-shell")).not.toHaveClass(/dark/);
  await page.locator("#launch-login").check();
  await expect(page.locator("#demo-live")).toContainText(
    "enabled in the demo only",
  );
  await page.locator("[data-download]").first().click();
  await expect(page.locator("#download-dialog")).toBeVisible();
  await page.locator("#dialog-demo").click();
  await expect(page.locator("#download-dialog")).not.toBeVisible();
  await expect(page.locator("#organize")).toBeFocused();
  await page
    .getByText("Can I undo an organizing session?", { exact: true })
    .click();
  await expect(page.locator("details").nth(1)).toHaveAttribute("open", "");
});

test("mobile navigation closes on links and Escape without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("#menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page
    .locator("#main-navigation")
    .getByRole("link", { name: "Questions" })
    .click();
  await expect(page.locator("#menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#menu-toggle")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(page.locator("#menu-toggle")).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("legacy anchors reach the matching sections", async ({ page }) => {
  await page.goto("/#features");
  await expect(page).toHaveURL(/\/#why$/);
});
