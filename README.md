# CXMT Memory Industry Map / 长鑫存储产业链

Public website: https://siyan-lyu.github.io/cxmt-memory-chain/

公开网站：https://siyan-lyu.github.io/cxmt-memory-chain/

Published and managed under Siyan-Lyu. Anyone can browse without a GitHub or ChatGPT account.

网站由 Siyan-Lyu 账户发布和管理，访客无需 GitHub 或 ChatGPT 账户。

## Website files / 网站文件

- `index.html`: self-contained bilingual website, with English above Chinese.
- `data/market.json`: sourced market snapshot and company updates.
- `.nojekyll`: serves the static files directly through GitHub Pages.

- `index.html`：独立双语页面，英文在上、中文在下。
- `data/market.json`：附来源的市场快照与公司更新。
- `.nojekyll`：通过 GitHub Pages 直接发布静态文件。

## Publishing / 发布

GitHub Pages deploys the `main` branch from `/(root)`. Changes committed to this repository are published automatically.

GitHub Pages 从 `main` 分支的 `/(root)` 发布，提交到本仓库的修改会自动部署。

The page loads the published market snapshot when opened and every five minutes while visible. It keeps the last valid snapshot if loading fails. No update timestamp, refresh control or technical status banner appears on the website.

页面打开时及保持可见时每五分钟读取已发布市场快照；加载失败则保留有效数据。网站不显示更新时间、刷新控件或技术状态横幅。

## Market research / 市场查证

An hourly ChatGPT research task is enabled through the connected Siyan-Lyu GitHub account. It checks primary sources and commits validated market-data changes, which GitHub Pages publishes automatically. Task activation does not mean its first research run has completed. See `docs/automatic-updates.md` for the research rules and `scripts/validate-market.mjs` for validation.

每小时的 ChatGPT 查证任务已通过连接的 Siyan-Lyu GitHub 账户开启。任务查阅一手来源，将通过验证的市场数据修改提交到仓库，再由 GitHub Pages 自动发布。任务启用不代表首次查证已经完成。查证规则见 `docs/automatic-updates.md`，校验脚本见 `scripts/validate-market.mjs`。

Update facts only when supported by primary sources. Preserve report periods, distinguish forecasts from reported results, retain historical funding records, and never infer CXMT supplier relationships from products or fundraising alone. Unknown amounts remain undisclosed.

仅凭一手资料更新事实，保留报告期，区分预测与已披露结果，保留历史融资记录；不根据产品或融资推断长鑫供货关系，未知金额保持未披露。
