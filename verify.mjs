import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 20000 });

await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'clone-hero.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'clone-full.png'), fullPage: true });

// Scroll to prices
await page.evaluate(() => window.scrollTo(0, 900));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'clone-prices.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

await browser.close();
console.log('done');
