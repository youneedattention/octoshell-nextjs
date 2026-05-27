import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

// Desktop
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 20000 });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'v3-desktop.png') });

// Click 日 button
await page.click('button[aria-label="Switch to 日"]');
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'v3-japanese.png') });

// Click 繁 button
await page.click('button[aria-label="Switch to 繁"]');
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'v3-chinese.png') });

// Mobile iPhone 390
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 20000 });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'v3-mobile.png') });

await browser.close();
console.log('done');
