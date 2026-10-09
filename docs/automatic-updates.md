# Automatic updates / 自动更新

The site reads the published market snapshot on opening and every five minutes while visible. An hourly ChatGPT automation can research new public announcements and update `data/market.json` through the owner's connected GitHub account. It runs even when visitors close the site.
页面打开时以及保持可见时每五分钟读取已发布快照。每小时的 ChatGPT 自动任务可查证新公告，并通过网站所有者连接的 GitHub 账户更新 `data/market.json`；访客关闭网页后，任务仍可运行。

This automation requires working repository write access. Keep `scheduler.enabled` false until task creation succeeds. A prepared task specification is not an active task.
此功能需要仓库写入权限。仅在自动任务创建成功后才将 `scheduler.enabled` 设为 true。已准备的任务说明不代表任务已经开启。

## Task specification / 任务说明

Read `data/market.json` and this document on branch `main` of `Siyan-Lyu/cxmt-memory-chain` using the connected GitHub account. Fetch a fresh file SHA before writing. Preserve concurrent changes and the 42-company watchlist.
通过已连接的 GitHub 账户读取 `Siyan-Lyu/cxmt-memory-chain` 仓库 `main` 分支的 `data/market.json` 与本说明。写入前取得最新文件 SHA，保留并行修改及 42 家公司名单。

Check the latest primary public sources: CXMT's newsroom and investor disclosures, TrendForce's memory press releases, and relevant stock-exchange and company announcements. Check core memory news each run. Review four watchlist companies per run in a rotating sequence recorded as `scheduler.watchlistCursor` so the full watchlist is covered. Search for new financing, listing, product, revenue and market-share disclosures. Use the source itself as evidence, rather than a search excerpt alone.
每次查证长鑫新闻及投资者披露、TrendForce 存储新闻，以及相关交易所和公司公告。每次检查核心存储动态，轮流检查名单中四家公司，将进度保存在 `scheduler.watchlistCursor`。关注融资、上市、产品、收入及市场份额披露；以来源正文为证据，不能只依赖搜索摘要。

Update only explicitly supported fields. Every new metric requires bilingual label, value and period; every news item requires a date, concise original bilingual title and summary, and sourceId pointing to a real source URL. Do not copy full articles. Retain the period and distinguish forecasts from reported results. Do not infer CXMT supplier relationships from a company's products or financing. Leave undisclosed amounts undisclosed. Keep historical financing rounds and financial years unchanged.
只更新有明确证据的字段。新指标须有双语名称、数值及报告期；新闻须有日期、简短原创双语标题与摘要，以及对应真实网址的 sourceId。不复制整篇文章，区分预测与已披露结果，不根据产品或融资推断长鑫供货关系；未披露金额继续标为未披露，历史融资和财务年份保持原样。

Use `companyUpdates` entries `{name,verifiedAt,fields}` for changes to the existing company database. Each entry must include supporting `fields.sourceUrl` and bilingual `fields.sourceLabel`. Use bilingual `{en,zh}` for text and canonical Chinese status values compatible with the existing filters. Never overwrite unrelated evidence with a single source that does not support it.
公司库变更使用 `{name,verifiedAt,fields}` 格式，并附 `fields.sourceUrl` 与双语 `fields.sourceLabel`。文字采用 `{en,zh}`，状态使用与现有筛选兼容的中文值。不要用无法支持全部字段的单一来源替换其他证据。

Advance a source's `checkedAt` only after reading it successfully. Advance `lastCheckedAt` after a successful research run; change `lastChangedAt` only when public facts change. Keep the last valid values and original timestamps if sources fail. Never substitute the current time for an old report's publication date. Record actual task state, not assumptions, in `scheduler`.
只在成功读取某来源后更新其 checkedAt；研究成功后更新 lastCheckedAt；只有公开事实改变时才更新 lastChangedAt。来源失败时保留有效旧值与日期，不把旧报告发布时间替换成当前时间。scheduler 记录真实任务状态。

Validate JSON structure, unique IDs, bilingual pairs, source references and dates against `scripts/validate-market.mjs`. Write the full updated JSON through the GitHub file-update tool, preserving the latest blob SHA. A data commit deploys through the repository's existing GitHub Pages branch publishing. Confirm the saved file through GitHub. Report an access or publishing failure clearly without claiming it was updated.
按 `scripts/validate-market.mjs` 检查 JSON 结构、唯一 ID、双语字段、来源引用及日期，取得最新文件 SHA 后通过 GitHub 文件更新功能写入完整数据。数据提交沿用仓库现有 GitHub Pages 分支发布；通过 GitHub 重新读取验证保存结果。权限或发布失败时如实说明，不宣称更新成功。

Keep the website in English above Chinese, with readable text and source links, without update timestamps, refresh controls or technical status banners. Do not redesign the site, introduce secrets, change hosting providers, or email anyone.
页面保持英文在上、中文在下，文字清晰且保留来源链接，不显示更新时间、刷新控件或技术状态横幅。不重新设计网站、不引入密钥、不更换托管服务、不发送邮件。
