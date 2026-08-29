import { chromium } from "playwright";

const outDir = "/tmp/claude-1000/-home-sachin-Documents-TECHNnOVATE-plh-studio-next/76a4a5bf-8213-4008-9ba3-ea9f84a31791/scratchpad";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const page = await context.newPage();
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForSelector("#why");

const wrap = page.locator('#why div[style*="dvh"]').first();
await wrap.waitFor();

async function flick(delta) {
  const chunks = 6;
  for (let i = 0; i < chunks; i++) {
    await page.mouse.wheel(0, delta / chunks);
    await page.waitForTimeout(35);
  }
  await page.waitForTimeout(1500);
  return wrap.boundingBox();
}
async function reachY(targetY, maxTries = 10) {
  let box = await wrap.boundingBox();
  for (let i = 0; i < maxTries && box; i++) {
    const gap = targetY - box.y;
    if (Math.abs(gap) < 15) break;
    box = await flick(-gap);
  }
  return box;
}

await reachY(0);
await page.screenshot({ path: `${outDir}/dots-1-entry.png` });

console.log("console/page errors:", errors);
await browser.close();
