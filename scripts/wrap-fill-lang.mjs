import { readFileSync, writeFileSync } from 'fs';

function wrapAllMultiLangObjects(src) {
  let result = '';
  let i = 0;

  while (i < src.length) {
    if (src[i] === '{') {
      let depth = 1;
      let j = i + 1;
      while (j < src.length && depth > 0) {
        const ch = src[j];
        if (ch === '{') { depth++; j++; }
        else if (ch === '}') { depth--; j++; }
        else if (ch === '"' || ch === "'") {
          const q = ch; j++;
          while (j < src.length && !(src[j] === q && src[j - 1] !== '\\')) j++;
          j++;
        } else if (ch === '`') {
          j++;
          while (j < src.length && src[j] !== '`') j++;
          j++;
        } else {
          j++;
        }
      }

      const obj = src.slice(i, j);

      // Check if object has both en: and ja: at its top level (rough heuristic)
      const hasEn = /\ben\s*:/.test(obj);
      const hasJa = /\bja\s*:/.test(obj);

      // Don't wrap if already preceded by fillLang( or if it's a JSX/object spread context
      const tail = result.trimEnd().slice(-12);
      const alreadyWrapped = tail.endsWith('fillLang(');
      const isJsx = tail.endsWith('return (') || tail.endsWith('=>') || tail.endsWith('=> (');

      if (hasEn && hasJa && !alreadyWrapped) {
        result += 'fillLang(' + obj + ')';
      } else {
        result += obj;
      }
      i = j;
    } else {
      result += src[i];
      i++;
    }
  }
  return result;
}

const files = [
  'src/app/airport/page.tsx',
  'src/app/faq/page.tsx',
  'src/app/fleet/page.tsx',
  'src/app/law/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/services/[route]/routeData.ts',
  'src/app/services/page.tsx',
  'src/components/Price.tsx',
  'src/components/ReviewsSection.tsx',
  'src/lib/faq.ts',
];

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  const count1 = (src.match(/\bfillLang\(/g) || []).length;
  const newSrc = wrapAllMultiLangObjects(src);
  const count2 = (newSrc.match(/\bfillLang\(/g) || []).length;
  if (newSrc !== src) {
    writeFileSync(f, newSrc, 'utf8');
    console.log(`${f}: wrapped ${count2 - count1} objects`);
  } else {
    console.log(`${f}: no change`);
  }
}
