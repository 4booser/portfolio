// Usage: node shoot2.mjs <fragment.html> <outPrefix> [waitMs]
// Like shoot.mjs, plus pinned jsDelivr npm scripts served from ./libs/node_modules.
import { routeCdn, wrapFragment, launch } from './cdn.mjs';
import path from 'path';
const [,, src, out, waitArg] = process.argv;
const wait = +(waitArg || 3500);
const url = wrapFragment(src, path.resolve(path.dirname(out), path.basename(out) + '.wrapped.html'));
const browser = await launch();
for (const [name, vp, mobile] of [['desktop', { width: 1440, height: 900 }, false], ['phone', { width: 390, height: 844 }, true]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
  const errs = []; await routeCdn(ctx, errs);
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(`[${m.type()}] ${m.text()}`); });
  page.on('pageerror', e => errs.push(`[pageerror] ${e.message}`));
  page.on('requestfailed', r => errs.push(`[reqfail] ${r.url()} ${r.failure()?.errorText}`));
  await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(e => errs.push('[goto] ' + e.message));
  await page.mouse.move(vp.width * 0.6, vp.height * 0.4).catch(() => {});
  await page.waitForTimeout(wait);
  const sw = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth, document.documentElement.scrollHeight]);
  await page.screenshot({ path: `${out}-${name}.png` });
  const H = sw[2];
  for (const f of [0.25, 0.5, 0.75]) {
    await page.evaluate(y => { document.documentElement.style.scrollBehavior = 'auto'; window.scrollTo(0, y); }, Math.round(H * f));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${out}-${name}-s${Math.round(f * 100)}.png` });
  }
  console.log(`${name}: scrollWidth=${sw[0]} innerWidth=${sw[1]} scrollHeight=${sw[2]} ${sw[0] > sw[1] ? 'HORIZONTAL OVERFLOW' : 'ok'}`);
  console.log(errs.length ? errs.join('\n') : `${name}: no console errors`);
  await ctx.close();
}
await browser.close();
