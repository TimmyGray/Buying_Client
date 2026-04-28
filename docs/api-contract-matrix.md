# API contract matrix

## Core endpoint alignment

| Area | Frontend route | Backend route | Status |
|---|---|---|---|
| Buys list | `GET /buys` | `GET /Buys` | ✅ aligned |
| Buy image | `GET /buys/image/{id}` | `GET /Buys/image/{id}` | ✅ updated from legacy `getimage` |
| Clients create | `POST /clients` | `POST /Clients` (`ClientUpsertRequest`) | ✅ aligned |
| Orders create | `POST /orders` | `POST /Orders` | ✅ aligned |
| Orders by client | `GET /orders/{clientId}` | `GET /Orders/{clientId}` | ✅ aligned |
| Prices list | `GET /prices` | `GET /Prices` | ✅ aligned |
| Connectors list | `GET /connectors` | `GET /Connectors` | ✅ aligned |
| Coils list | `GET /coils` | `GET /Coils` | ✅ aligned |

## Model/property alignment

| Frontend model | Backend model | Key mappings |
|---|---|---|
| `Buy` | `BuyingLibrary.models.classes.Buy` | `id`, `name`, `description`, `cost`, `item`, `itemId`, `count`, `image`, `custom` |
| `Image` | `BuyImage` | `id`, `name`, `size`, `type`, `data` (data cleared before order post) |
| `Client` | `Client` / `ClientUpsertRequest` | `id`, `name`, `email` |
| `Order` | `Order` | `id`, `client`, `name`, `created`, `status`, `buys` |
| `Price` | `Price` | `id`, `name`, `cost`, `itemOfPrice` |
| `Connector` | `Connector` | `id`, `name`, `type`, `count` |
| `Coil` | `Coil` | `id`, `name`, `type`, `length` |

## Known compatibility handling

- Buy service maps legacy `itemid` payloads into modern `itemId`.
- Buy service defensively normalizes partial/invalid buy payloads into safe defaults.
- Image download now uses backend v2 route format (`/image/{id}`).
- Order posting sanitizes image byte payload in line items to avoid large/invalid request bodies.
- Cart order submission now posts only user-selected line items.
- `OrderStatus` enum values in frontend now match backend naming semantics.
