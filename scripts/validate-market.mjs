import fs from "node:fs";
import assert from "node:assert/strict";
import {fileURLToPath} from "node:url";

const file=process.argv[2] || fileURLToPath(new URL("../data/market.json",import.meta.url));
const data=JSON.parse(fs.readFileSync(file,"utf8"));
const pair=(value,label)=>{
  assert.ok(value&&typeof value.en==="string"&&value.en.trim()&&typeof value.zh==="string"&&value.zh.trim(),label+" needs English and Chinese");
  assert.ok(!/[\u3400-\u9fff]/u.test(value.en),label+" has Chinese in the English field");
};
const date=(value,label)=>assert.ok(typeof value==="string"&&Number.isFinite(Date.parse(value)),label+" needs a date");
const url=(value)=>assert.ok(/^https?:\/\//.test(value),"Source needs a public HTTP(S) URL");
assert.equal(data.schemaVersion,1);
date(data.baselineAsOf,"Baseline");
date(data.lastCheckedAt,"Check time");
date(data.lastChangedAt,"Update time");
assert.ok(Date.parse(data.lastChangedAt)<=Date.parse(data.lastCheckedAt),"Data update cannot follow its source check");
assert.ok(Array.isArray(data.sources)&&data.sources.length);
const ids=new Set();
for(const source of data.sources){
  assert.ok(source.id&&!ids.has(source.id),"Duplicate or missing source ID");ids.add(source.id);
  pair(source.name,"Source name");url(source.url);date(source.publishedAt,"Publication");date(source.checkedAt,"Source check");
}
for(const [key,fields] of [["metrics",["label","value","period"]],["news",["title","summary"]]]){
  assert.ok(Array.isArray(data[key]),key+" needs an array");
  const unique=new Set();
  for(const item of data[key]){
    assert.ok(item.id&&!unique.has(item.id),"Duplicate or missing "+key+" ID");unique.add(item.id);
    assert.ok(ids.has(item.sourceId),"Unknown source for "+item.id);
    for(const field of fields)pair(item[field],item.id+"."+field);
    if(key==="news")date(item.date,"News date");
  }
}
assert.equal(data.watchlist.length,42,"Preserve the complete company watchlist");
const names=new Set(data.watchlist.map(company=>company.name));
for(const update of data.companyUpdates||[]){
  assert.ok(names.has(update.name),"Unknown company update");date(update.verifiedAt,"Company check");
  assert.ok(update.fields?.sourceUrl&&update.fields?.sourceLabel,"Company update needs its own evidence");
  url(update.fields.sourceUrl);pair(update.fields.sourceLabel,"Company source");
  for(const [field,value] of Object.entries(update.fields))if(value&&typeof value==="object")pair(value,update.name+"."+field);
}
console.log(JSON.stringify({valid:true,metrics:data.metrics.length,news:data.news.length,companies:data.watchlist.length}));
