// Shared helper: serve pinned jsDelivr npm URLs from the local node_modules copy (the sandbox proxy blocks CDNs).
// Usage in any Playwright script:  import { routeCdn, wrapFragment, launch } from './cdn.mjs'
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'fs'; import path from 'path';
const NM = new URL('./node_modules/', import.meta.url).pathname;
export async function routeCdn(ctx, log = []) {
  await ctx.route(/^https:\/\/cdn\.jsdelivr\.net\/npm\/.*/, async route => {
    const m = route.request().url().match(/^https:\/\/cdn\.jsdelivr\.net\/npm\/((?:@[^/]+\/)?[^@/]+)@([^/]+)\/(.+)$/);
    if (!m) { log.push('[cdn] unparsed ' + route.request().url()); return route.abort(); }
    const [, pkg, ver, file] = m;
    const pj = path.join(NM, pkg, 'package.json');
    if (!fs.existsSync(pj)) { log.push(`[cdn] NOT INSTALLED ${pkg}@${ver} — run npm i ${pkg}@${ver} in libs/`); return route.abort(); }
    const have = JSON.parse(fs.readFileSync(pj, 'utf8')).version;
    if (have !== ver) { log.push(`[cdn] VERSION MISMATCH ${pkg}: page wants ${ver}, local ${have}`); return route.abort(); }
    const fp = path.join(NM, pkg, file);
    if (!fs.existsSync(fp)) { log.push(`[cdn] 404 ${pkg}@${ver}/${file} (this path would 404 on jsDelivr too)`); return route.fulfill({ status: 404, body: '' }); }
    route.fulfill({ status: 200, contentType: 'application/javascript', body: fs.readFileSync(fp) });
  });
}
export function wrapFragment(src, outHtml) {
  const frag = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(outHtml, `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${frag}</body></html>`);
  return 'file://' + path.resolve(outHtml);
}
export function launch() {
  return chromium.launch({ executablePath: '/opt/pw-browsers/chromium', proxy: { server: process.env.HTTPS_PROXY }, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
}
