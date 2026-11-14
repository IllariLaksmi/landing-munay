# Munay — Unconditional love in action

Sitio bilingüe (ES / EN) de **Munay**, organización sin fines de lucro
**501(c)(3)** fundada en 2026 que ofrece educación sexual y sanación
somática/holística informada en el trauma para comunidades desatendidas.

Construido con **Next.js 16 (App Router + Cache Components)**, **TypeScript**,
**Tailwind CSS v4**, `next/font`, `pnpm` y una suite de accesibilidad
**Playwright + `@axe-core/playwright`** que audita todas las rutas contra
WCAG 2.1 AA.

---

## 1. Puesta en marcha

```bash
# 1. Instalar dependencias
pnpm install

# 2. Desarrollo (http://localhost:3000 → redirige a /es)
pnpm dev

# 3. Verificación de tipos y lint
pnpm typecheck
pnpm lint

# 4. Producción
pnpm build
pnpm start

# 5. Tests de accesibilidad (la primera vez descarga Chromium)
pnpm exec playwright install chromium
pnpm test:a11y

# 6. Tests contra el build de producción
PLAYWRIGHT_PRODUCTION=1 pnpm test:a11y
```

> El proyecto usa `pnpm` (ver `packageManager` en `package.json`). El lockfile
> canónico es `pnpm-lock.yaml`.

---

## 2. Rutas

| Ruta | Contenido |
| --- | --- |
| `/[locale]` | Home: hero, historia + fundadora, programas, próximo evento y donación |
| `/[locale]/about` | Misión, visión, 8 valores, equipo (`#team`) y junta directiva |
| `/[locale]/programs` | Principios, talleres, servicios individuales (tabs accesibles) y retiros |
| `/[locale]/calendar` | Próximos eventos + formulario de suscripción |
| `/[locale]/blog` | Listado de artículos desde Markdown local |
| `/[locale]/blog/[slug]` | Artículo bilingüe |
| `/[locale]/contact` | Formulario accesible y datos de contacto |
| `/[locale]/legal` | Privacidad, términos y cookies |

`locale` es `es` o `en`. Cualquier ruta sin prefijo redirige a `/es`.

---

## 3. Estructura

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # html lang, fuentes, skip link, Navbar + Footer
│   │   ├── page.tsx            # Home
│   │   ├── about/page.tsx
│   │   ├── programs/page.tsx
│   │   ├── calendar/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── legal/page.tsx
│   ├── globals.css             # tokens @theme, focus, motion, skip link
│   └── icon.svg
├── components/
│   ├── blog/Markdown.tsx       # renderer Markdown sin HTML crudo
│   ├── sections/               # Navbar, Footer, Hero, Story, Programs, Tabs…
│   └── ui/                     # Button de donación, PageHeader, accesorios
├── content/blog/{en,es}/       # artículos Markdown
├── data/                       # values, services, team, events (tipados)
├── dictionaries/{en,es}.json   # copy bilingüe
├── lib/                        # i18n, blog, fuentes, constantes
└── types/dictionary.ts
tests/a11y.spec.ts              # Playwright + axe, desktop y mobile
```

---

## 4. Contenido y datos

- **Diccionarios:** `src/dictionaries/en.json` y `es.json` comparten la misma
  forma. `es.json` es el modelo canónico y TypeScript valida que `en.json` no
  pierda claves.
- **Datos tipados:** `src/data/values.ts`, `services.ts`, `team.ts` y
  `events.ts`, cada uno con soporte `en`/`es`.
- **Junta directiva:** `boardMembers` incluye `published: false`. El componente
  `BoardList` no se renderiza hasta que exista al menos un nombre público, así
  que nunca aparecen textos de “pendiente”.
- **Blog:** añade un archivo `.md` con frontmatter (`title`, `excerpt`, `date`,
  `author`) en `src/content/blog/en/` y `es/`. Usa el mismo nombre de archivo en
  ambos idiomas para conservar el slug al cambiar de idioma.

### Enlaces clave

- Donaciones (Zeffy): `https://www.zeffy.com/en-US/donation-form/donate-to-create-safe-spaces-for-healing`
- Email: `info@munayinaction.org`
- Instagram: `@munayfoundation`

---

## 5. Accesibilidad (WCAG 2.1 AA)

- Un único `<h1>` por página y jerarquía de encabezados secuencial.
- Skip link, `:focus-visible` con anillo de alto contraste y foco adaptado a
  superficies azules (`prefers-reduced-motion` respetado).
- Selector de idioma con `hreflang`, `lang` y `aria-current="page"`.
- Enlaces externos (Zeffy, Instagram) anuncian que abren una pestaña nueva
  mediante texto `sr-only`.
- Pestañas de servicios individuales con `role="tablist"`, `aria-selected`,
  `aria-controls` y navegación por flechas / Home / End.
- Formularios con etiquetas explícitas, `aria-invalid`, resumen de errores,
  `aria-describedby` y confirmación en región `aria-live="polite"`.
- SVG botánico siempre `aria-hidden="true"` y `focusable="false"`.
- Contraste: `#1840AA` sobre `#F4F4E6`; `#1840AA` sobre `#FFC71B` / `#8DC63F`
  para badges; `#7859F4` solo en titulares grandes sobre crema.

---

## 6. Tests

`tests/a11y.spec.ts` recorre las rutas `/{es,en}` para Home, About, Programs,
Calendar, Blog y Contact en **Desktop (1440×900)** y **Mobile (390×844)**.
Cada escenario verifica `lang`, un único `h1` visible y ejecuta axe con las
etiquetas `wcag2a`, `wcag2aa`, `wcag21a` y `wcag21aa`.

```bash
pnpm test:a11y                 # contra el servidor de desarrollo
PLAYWRIGHT_PRODUCTION=1 pnpm test:a11y   # contra pnpm build + pnpm start
pnpm test:a11y:report          # abre el reporte HTML
```
