import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 20000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 1000));

const h = await page.evaluate(() => document.body.scrollHeight);
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'clone-prices2.png'), clip: { x: 0, y: 900, width: 1440, height: 900 } });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'clone-services.png'), clip: { x: 0, y: h - 1300, width: 1440, height: 1300 } });

await browser.close();
console.log('total height', h);
