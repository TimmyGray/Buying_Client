# Buying Client

Modernized Angular frontend for the customer flow of the Buying platform.

## Related repositories

- Frontend (this repo): `TimmyGray/Buying_Client`
- Backend API: `TimmyGray/Dotnet_Server`
- Shared backend domain library: `TimmyGray/BuyingLibrary`

## Tech stack

- Angular 19
- Angular Material 19
- RxJS 7.8
- TypeScript 5.8
- Karma + Jasmine (unit tests)

## Local setup

```bash
npm install
```

## Run

```bash
npm start
```

Default dev URL: `http://localhost:4300`.

## Build

```bash
npm run build
```

## Test

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Environment configuration

API URL is configured in:

- `/home/runner/work/Buying_Client/Buying_Client/src/environments/environment.ts`
- `/home/runner/work/Buying_Client/Buying_Client/src/environments/environment.prod.ts`

Update `apiUrl` to match your backend host.

## Documentation

- Architecture and flows (Mermaid): `docs/architecture.md`
- API contract matrix: `docs/api-contract-matrix.md`
- Contract mismatch register: `docs/contract-mismatch-register.md`
- Baseline snapshot: `docs/baseline-snapshot.md`
- Frontend inventory: `docs/frontend-inventory.md`
- Testing strategy and scope: `docs/testing-strategy.md`

## Notes

- Backend contract has been aligned to the modernized `Dotnet_Server` routes and DTOs.
- Legacy Angular Flex Layout was replaced with `@ngbracket/ngx-layout`.
