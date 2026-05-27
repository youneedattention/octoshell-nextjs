import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Law page - hero section
await page.goto('http://localhost:3000/law', { waitUntil: 'networkidle2', timeout: 20000 });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'law-hero.png'), clip: { x: 0, y: 0, width: 1440, height: 900 } });

// Law page - full content
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'law-full.png'), fullPage: true });

// Mobile view
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/law', { waitUntil: 'networkidle2', timeout: 20000 });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'law-mobile.png'), fullPage: true });

await browser.close();
console.log('done');
