import {chromium,_electron} from 'playwright-core';
import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sites=(process.env.BENCH_URLS||'https://example.com,https://www.wikipedia.org').split(',').filter(Boolean);
const rounds=Math.max(2,Math.min(10,Number(process.env.BENCH_ROUNDS||3)));
const median=a=>{const s=[...a].sort((x,y)=>x-y);return s[Math.floor(s.length/2)]};
async function sample(page,url){await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});return page.evaluate(()=>{const n=performance.getEntriesByType('navigation')[0];return {dclMs:Math.round(n?.domContentLoadedEventEnd||0),responseMs:Math.round(n?.responseEnd||0),transferBytes:n?.transferSize||0}})}
async function runChromium(name,executablePath){const browser=await chromium.launch({executablePath,headless:false});try{const context=await browser.newContext();const page=await context.newPage();const values=[];for(let i=0;i<rounds;i++)for(const url of sites){try{values.push({url,...await sample(page,url)})}catch(e){console.error(name,url,e.message)}}return {name,samples:values.length,medianDclMs:median(values.map(x=>x.dclMs)),medianResponseMs:median(values.map(x=>x.responseMs)),values}}finally{await browser.close()}}
const results=[];for(const [name,env] of [['Edge','EDGE_EXE'],['Brave','BRAVE_EXE']]){if(process.env[env])results.push(await runChromium(name,process.env[env]))}
console.log('This first harness benchmarks installed Edge/Brave with identical sites. Unique Browser automation and apples-to-apples startup/memory testing are pending.');
if(!results.length){console.error('Set EDGE_EXE and/or BRAVE_EXE to installed executable paths. No results were fabricated.');process.exitCode=1}else{console.table(results.map(({name,samples,medianDclMs,medianResponseMs})=>({name,samples,medianDclMs,medianResponseMs})));console.log(JSON.stringify({sites,rounds,results},null,2))}
