# Preview check

Скрипты, которыми проверялись превью в headless Chromium.

- `shoot2.mjs` — оборачивает фрагмент артефакта в такой же каркас, как у хостинга, снимает скриншоты 1440×900 и 390×844 (верх страницы плюс кадры на 25/50/75% скролла), печатает ошибки консоли и горизонтальный переполн.
- `cdn.mjs` — общие помощники для своих Playwright-скриптов: `routeCdn` отдаёт закреплённые URL `cdn.jsdelivr.net/npm/<пакет>@<версия>/…` из локального `node_modules` и ругается, если версия или путь не совпадают с тем, что лежит на jsDelivr.

```sh
cd tools/preview-check && npm install
node shoot2.mjs ../../previews/b-kinetic-v2.html /tmp/shots/kinetic 3500
```

Путь к Playwright в `cdn.mjs` (`/opt/node22/lib/node_modules/playwright`) рассчитан на облачное окружение, где проверялись превью; на другой машине поменяйте его на свой.
