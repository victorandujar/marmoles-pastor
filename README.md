# Mármoles Pastor — propuesta de web

Demo de Web Local Growth para Mármoles Pastor, S.L., marmolistas en Montcada i Reixac (C/ de l'Electricitat, 17). **No es la web oficial.**

## Por qué

Su dominio, marmolespastor.com, no responde: la web está caída. En Google casi no aparecen fuera de la ficha de Xarxa Industrial, el mismo directorio de Destonac.

## Identidad

- **Taller de piedra:** papel #F2EFE9, tinta #1D1C1A, losa oscura #232220 y una veta dorada (#A9824A; #7A5C2E para texto pequeño, por contraste).
- **Tipografía:** Bricolage Grotesque (titulares) y Manrope (texto), autoalojadas.
- **Elemento interactivo:** una muestra de piedra generada con código (mármol, granito, piedra natural y porcelánico). El brillo del pulido sigue al cursor o al dedo; sin interacción, la luz se mueve sola despacio. El cálculo de las texturas va en un Web Worker para no bloquear la página. Respeta `prefers-reduced-motion`.

## Contenido y fuentes

- Datos y descripción: su ficha de Xarxa Industrial (actualizada en noviembre de 2023).
- Fotos: las 10 de trabajos de su ficha (cocinas, escalera, barra). **No se usan** sus 4 fotos de texturas: están retocadas en Photoshop y pueden ser de stock. Las texturas de la portada son ilustraciones generadas.
- Los pies de foto describen lo que se ve, sin afirmar materiales concretos que no constan.

## Pendiente

- [ ] Confirmar que siguen activos (Google Maps / Instagram).
- [ ] El email marmolespastor@marmolespastor.com es del dominio caído: puede no funcionar.
- [ ] NIF, horario y fotos más recientes.

## Stack

Astro (SSG) · TypeScript estricto · Tailwind 4 · JS mínimo. Modo demo con `PUBLIC_IS_DEMO` (por defecto activo: `noindex`, `robots.txt` cerrado y aviso visible).

```bash
npm install
npm run dev
npm run build
```
