# Octoshell Japan — Claude Code Guide

## Project
Next.js 16 + TypeScript + Tailwind CSS 4. Private chauffeur service website for Japan market.
Live: https://octoshell.jp | Staging: https://octoshell-nextjs.vercel.app
GitHub: https://github.com/youneedattention/octoshell-nextjs
Local: C:\Users\Admin\Vibe coding\octoshell-nextjs
Git remote: origin → master

## Directory Structure
```
src/
  app/                  # Pages (App Router)
    page.tsx            # Home
    about/
    airport/
    book/
    law/
    privacy/
    reviews/
    services/
      [route]/          # Dynamic service pages
    vehicles/
    api/
      book/route.ts
      contact/route.ts
    sitemap.xml/route.ts
    layout.tsx          # Root layout (JSON-LD schema, providers)
    globals.css
  components/
    Header.tsx
    SiteFooter.tsx
    Price.tsx
    ReviewsSection.tsx
    PlacesInput.tsx
    DialCodeSelect.tsx
  context/
    LangContext.tsx     # useLang() → lang: "en" | "ja" | "zh"
    CurrencyContext.tsx
    ThemeContext.tsx
  lib/
    translations.ts     # t["key"][lang] pattern
    reviews.ts
  middleware.ts
```

## Rules (auto-apply, no reminder needed)

### i18n — Trilingual
- Every user-facing string must use `useLang()` + `t["key"][lang]` from `src/lib/translations.ts`
- Languages: `en` (English), `ja` (Japanese), `zh` (繁體中文)
- Language switcher icons go top-left in Header
- Add new translation keys to `translations.ts` for every new string

### Responsive
- Mobile-first Tailwind. Must work on: iPhone, iPad, Mac, PC
- Test all breakpoints: `sm` (640), `md` (768), `lg` (1024), `xl` (1280)

### New Page Checklist
1. Create `src/app/[pagename]/page.tsx`
2. Create `src/app/[pagename]/layout.tsx` with page-specific `metadata`
3. Add route to `src/app/sitemap.xml/route.ts`
4. If new service: add JSON-LD Offer to `layout.tsx` ORG_SCHEMA
5. **Create zh branch page** (mandatory):
   ```tsx
   // src/app/zh/[pagename]/page.tsx
   export { default } from "@/app/[pagename]/page";
   ```
6. Add zh URL to sitemap with hreflang alternates (see existing pattern in `sitemap.xml/route.ts`)

### Multilingual / zh Branch
- All pages MUST have a `/zh/[pagename]` equivalent for Traditional Chinese SEO
- The `zh/layout.tsx` provides `initialLang="zh"` — no extra code needed in zh page files
- Clicking 繁體中文 in the language switcher navigates to `/zh/*` automatically
- If a zh page is missing, `zh/[...slug]/page.tsx` catches it and redirects to English
- Pattern for zh pages: thin re-export wrapper, one line only

### SEO
- Every page needs its own `layout.tsx` with `export const metadata`
- Update JSON-LD offers when prices change
- Canonical base: `https://octoshell.jp`

### Git
- Commit and push after every change immediately

## Key Patterns

### Translation usage
```tsx
const { lang } = useLang();
// then: t["some_key"][lang]
```

### New translation key
```ts
// in src/lib/translations.ts
my_key: { en: "English", ja: "日本語", zh: "中文" },
```

### Page layout template
```tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Page Title",
  description: "...",
  alternates: { canonical: "https://octoshell.jp/pagename" },
};
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```
