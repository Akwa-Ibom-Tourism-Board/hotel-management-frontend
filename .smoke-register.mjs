import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

await page.goto("http://localhost:3002/register", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/screenshot-owner-register.png", fullPage: true });

await page.goto("http://localhost:3002/", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/screenshot-owner-landing.png", fullPage: true });

await browser.close();
console.log("CONSOLE_ERRORS_COUNT:", errors.length);
if (errors.length) console.log("ERRORS:", JSON.stringify([...new Set(errors)], null, 2));
