import puppeteer from 'puppeteer';
import path from 'path';
import os from 'os';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('https://octoshell.jp', { waitUntil: 'networkidle2', timeout: 30000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 2000));

// Get full page in one go
await page.screenshot({ path: path.join(os.homedir(), 'Desktop', 'oct-full2.png'), fullPage: true });

// Get services section text detail
const services = await page.evaluate(() => {
  const all = [...document.querySelectorAll('h3,h4,.elementor-widget-heading h2')];
  return all.map(el => ({ tag: el.tagName, text: el.innerText, class: el.className }));
});
console.log(JSON.stringify(services, null, 2));

// Get prices cards
const prices = await page.evaluate(() => {
  const priceSection = [...document.querySelectorAll('*')].find(el => el.innerText?.includes('PRICES') && el.innerText?.includes('ALPHARD'));
  return priceSection ? priceSection.innerText : 'not found - scraping all tables';
});
console.log('Prices section:', prices);

await browser.close();
