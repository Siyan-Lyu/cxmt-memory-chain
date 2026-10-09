# CXMT Memory Industry Map / 长鑫存储产业链

Public website / 公开网站: https://siyan-lyu.github.io/cxmt-memory-chain/

English appears above Chinese throughout the courses, company details, filters, tables and market-update panel.
课程、公司详情、筛选、表格与市场更新区域均采用英文在上、中文在下。

## Content / 内容

- `src/baseline.html`: preserved July 16, 2026 website and its licensed React bundle.
- `src/translations.json`: complete static bilingual dictionary.
- `src/bilingual-runtime.js` and `src/bilingual.css`: bilingual rendering and layout.
- `data/market.json`: sourced current snapshot, source-check records and company-specific updates.
- `scripts/build.mjs`: creates the self-contained `index.html`.

Run `node scripts/build.mjs` after changing the baseline, dictionary, layout, runtime or embedded snapshot.
修改底稿、翻译、样式、运行逻辑或内置快照后，执行 `node scripts/build.mjs`。

The public page loads `data/market.json` when opened, on manual refresh and every five minutes while visible. Publishing a new data file updates the public page independently of rebuilding the original courses. If loading fails, it keeps the saved snapshot without an update timestamp or technical banner.
公开页面打开、手动刷新及保持可见时每五分钟读取 `data/market.json`。发布新数据文件即可更新线上数据，失败时保留快照，不显示更新时间或技术提示横幅。

## Update rules / 更新规则

The original 42-company dataset is a dated baseline, not a claim that every company's status is current. Update only fields supported by new evidence. Historical reports and financing rounds keep their original periods.
原有 42 家公司库属于有日期的基准版本，不代表全部公司状态已最新。只更新有证据支持的字段，历史报告与融资保留原有时期。

Every metric requires an explicit period, source URL, publication date, check date and forecast/result distinction. Keep the last valid value when a source is unavailable. Never infer supply to CXMT from overlapping products or funding.
每项指标须有报告期、来源网址、发布时间、检查日期及预测/结果区分。来源暂不可用时保留旧值，不根据产品或融资推断供货关系。

Company updates use `{name, verifiedAt, fields}`; `fields.sourceUrl` and `fields.sourceLabel` identify the supporting evidence. Text fields in `fields` use `{en,zh}` pairs. Canonical status values use Chinese so the existing filters continue to work. Unknown funding amounts remain undisclosed.
公司更新使用 `{name, verifiedAt, fields}`；`fields.sourceUrl` 与 `fields.sourceLabel` 标明对应证据。文字字段采用 `{en,zh}`。状态的中文值用于原有筛选逻辑，未知融资金额保留为未披露。

Scheduling status is recorded in the data file only after an automatic task has actually been enabled.
仅在自动任务确已开启后，才在数据文件记录已开启状态。

## Hosting / 发布

This repository uses the existing public GitHub Pages configuration: `main` and `/(root)`. Visitors do not need GitHub or ChatGPT accounts.
保留现有公开 GitHub Pages 配置：`main` 与 `/(root)`。访问者无需 GitHub 或 ChatGPT 账号。

## Automatic research / 自动查证

See `docs/automatic-updates.md` for the prepared hourly task specification. Validate a new snapshot with `node scripts/validate-market.mjs`. Task activation requires verified GitHub write access.
每小时自动任务说明见 `docs/automatic-updates.md`。执行 `node scripts/validate-market.mjs` 校验新快照。任务开启须先确认 GitHub 写入权限。
