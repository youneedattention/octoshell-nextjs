import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const out = path.join(os.homedir(), 'Desktop', 'octoshell-full.png');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('https://octoshell.jp', { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: out, fullPage: true });
await browser.close();

console.log('Saved to', out);
