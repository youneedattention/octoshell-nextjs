import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('https://octoshell.jp', { waitUntil: 'networkidle2', timeout: 30000 });

// Scroll to bottom to trigger lazy load
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 2000));

const h = await page.evaluate(() => document.body.scrollHeight);
console.log('Total page height:', h);

await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'oct-sec3.png'), clip: { x: 0, y: 2700, width: 1440, height: 900 } });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'oct-sec4.png'), clip: { x: 0, y: 3600, width: 1440, height: 900 } });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'oct-sec5.png'), clip: { x: 0, y: 4500, width: 1440, height: 900 } });

await browser.close();
