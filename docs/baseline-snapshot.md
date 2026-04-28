# Baseline snapshot (2026-04-28)

## Toolchain

- Node.js: `20.20.2`
- npm: `10.8.2`
- Angular CLI: `19.2.24`
- Angular: `19.2.21`
- TypeScript: `5.8.3`
- RxJS: `7.8.2`
- Angular Material/CDK: `19.2.19`
- Layout: `@ngbracket/ngx-layout@17.0.1`

## Dependency and security state

- Command: `npm ci`
- Result: success
- npm audit summary after install: `11 vulnerabilities (5 moderate, 6 high)`

## Build and test baseline

- Command: `npm run build`
  - Result before fixes: failed
  - Root cause: missing `/src/environments/environment.prod.ts` required by Angular `fileReplacements`
- Command: `npm test -- --watch=false --browsers=ChromeHeadless`
  - Result: success (`11` tests passed)
  - Observation: test output included debug `console.log` noise from runtime code

## Known runtime/code issues recorded at baseline

- Missing production environment file blocked production build.
- Cart order submission ignored checkbox selection and always submitted full cart.
- Cart removal and bulk-delete behavior relied on mutable object identity and recursion.
- Components/services contained debug `console.log` and `alert`-driven UX paths.
- Lifecycle cleanup patterns were incomplete in key components (`AppComponent`, `CreatingComponent`).
