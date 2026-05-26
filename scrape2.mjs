import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('https://octoshell.jp', { waitUntil: 'networkidle2', timeout: 30000 });

// Screenshot the prices section
await page.evaluate(() => window.scrollTo(0, document.querySelector('h2')?.closest('section')?.offsetTop || 900));

const sections = await page.evaluate(() => {
  return [...document.querySelectorAll('section, .elementor-section, .e-con')].map(s => ({
    id: s.id,
    class: s.className.slice(0, 80),
    innerText: s.innerText?.trim().slice(0, 500),
  })).filter(s => s.innerText);
});
console.log(JSON.stringify(sections, null, 2));

// Take screenshot of prices area
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'octoshell-prices.png'), clip: { x: 0, y: 900, width: 1440, height: 800 } });
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'octoshell-bottom.png'), clip: { x: 0, y: 1700, width: 1440, height: 1000 } });

await browser.close();
