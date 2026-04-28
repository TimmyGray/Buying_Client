# Contract mismatch register

This file tracks known frontend↔backend contract mismatches and mitigation status.

| ID | Area | Mismatch | Severity | Owner | Status | Mitigation |
|---|---|---|---|---|---|---|
| C-001 | Build config | `environment.prod.ts` referenced by Angular build but file missing | High | Frontend | ✅ Closed | Added production environment file |
| C-002 | Cart→Order contract | Cart checkbox state not applied to submitted order lines | High | Frontend | ✅ Closed | Order payload now built from selected cart lines only |
| C-003 | Client cart behavior | Bulk delete depended on mutable object identity/recursion | Medium | Frontend | ✅ Closed | Replaced with ID-based deterministic deletion |
| C-004 | Buy DTO parsing | Potential invalid/partial backend payload shape | Medium | Frontend | ✅ Closed | Added defensive normalization in `BuyService` |
| C-005 | Error UX mapping | Several flows used `alert`/debug logs instead of component status feedback | Medium | Frontend | ✅ Partially closed | Introduced UI status messages in cart/creating/buys; continue standardization |

## Remaining audit tasks against `Dotnet_Server` + `BuyingLibrary`

- Verify all DTO required/optional fields against current backend source.
- Verify enum name/value parity for all order and custom-cable statuses.
- Verify date/time serialization format expectations on order endpoints.
- Verify error payload schema (validation vs domain vs server faults) and map frontend handling.
