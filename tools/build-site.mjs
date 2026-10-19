// Builds the GitHub Pages site: the portfolio (Kinetic II) wrapped in a full HTML
// document as the site root. Output goes to _site/.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '_site');

// The one page the site publishes. The other previews stay in previews/ as an archive.
const SITE_PAGE = 'b-kinetic-v2.html';
const SITE_TITLE = '4booser — Creative Developer';

// Any unknown path (including the old /kinetic-ii/ and friends) lands on the portfolio.
const NOT_FOUND = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>4booser</title>\n'
  + '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
  + '<meta http-equiv="refresh" content="0; url=/portfolio/">\n</head>\n<body>\n'
  + '<p><a href="/portfolio/">4booser — portfolio</a></p>\n</body>\n</html>\n';

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
const page = fs.readFileSync(path.join(root, 'previews', SITE_PAGE), 'utf8').replace(/<title>[\s\S]*?<\/title>/, `<title>${SITE_TITLE}</title>`);
fs.writeFileSync(path.join(out, 'index.html'), wrap(page));
fs.writeFileSync(path.join(out, '404.html'), NOT_FOUND);
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`previews/${SITE_PAGE} -> /`);
