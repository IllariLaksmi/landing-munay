# Tipografías de marca / Brand fonts

El proyecto usa estas fuentes:

- **Display:** Bello Script Pro → `BelloScriptPro.woff2`
- **Sans:** Inter Variable → `InterVariable.ttf`

`src/lib/fonts.ts` las carga con `next/font/local` y expone las variables CSS
`--font-munay-display` y `--font-munay-sans`. `src/lib/fonts.local.ts` mantiene
la misma configuración por si hace falta importarla explícitamente.

## English

The project uses these typefaces:

- **Display:** Bello Script Pro
- **Sans:** Inter Variable

Both are loaded through `next/font/local` and keep the CSS variable names the
design tokens expect.
