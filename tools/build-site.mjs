// Builds the GitHub Pages site: wraps each preview fragment in a full HTML document
// and adds the index page. Output goes to _site/.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '_site');

// Preview file -> URL slug on the site.
const PAGES = {
  'b-kinetic-v2.html': 'kinetic-ii',
  'b-kinetic.html': 'kinetic',
  'a-singularity.html': 'singularity',
  'c-booser-os.html': 'booser-os',
};

// The same small reset the previews were designed against.
const RESET = ':root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
  + 'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}';

const HEAD_TAG = /^\s*(<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)/;

function wrap(fragment) {
  let head = '';
  let rest = fragment;
  for (let m; (m = rest.match(HEAD_TAG));) {
    head += m[1] + '\n';
    rest = rest.slice(m[0].length);
  }
  if (!/name="viewport"/.test(head)) {
    head = '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n' + head;
  }
  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n${head}<style>${RESET}</style>\n</head>\n<body>\n${rest.trim()}\n</body>\n</html>\n`;
}

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
for (const [file, slug] of Object.entries(PAGES)) {
  const src = path.join(root, 'previews', file);
  if (!fs.existsSync(src)) continue;
  fs.mkdirSync(path.join(out, slug), { recursive: true });
  fs.writeFileSync(path.join(out, slug, 'index.html'), wrap(fs.readFileSync(src, 'utf8')));
  console.log(`previews/${file} -> /${slug}/`);
}
fs.copyFileSync(path.join(root, 'tools', 'site', 'index.html'), path.join(out, 'index.html'));
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('index.html -> /');
