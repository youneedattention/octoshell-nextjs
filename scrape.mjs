import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('https://octoshell.jp', { waitUntil: 'networkidle2', timeout: 30000 });

const data = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].map(i => ({ src: i.src, alt: i.alt }));
  const bgImgs = [...document.querySelectorAll('*')].flatMap(el => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') return [{ tag: el.tagName, class: el.className, bg }];
    return [];
  });
  const texts = [...document.querySelectorAll('h1,h2,h3,h4,p,a,button,span')].map(el => ({
    tag: el.tagName,
    text: el.innerText?.trim().slice(0, 200),
    class: el.className,
  })).filter(t => t.text);
  return { imgs, bgImgs: bgImgs.slice(0, 20), texts: texts.slice(0, 80) };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
