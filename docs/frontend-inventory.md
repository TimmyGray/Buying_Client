# Frontend inventory

## Routes

- `/` → `BuysComponent`
- `/creating` → `CreatingComponent`
- `/cart` → `CartComponent`
- `**` → `NotFoundComponent`

## Components

- `AppComponent` (`src/app/components/app.component.ts`)
- `BuysComponent` (`src/app/components/buys.component.ts`)
- `CreatingComponent` (`src/app/components/creating.component.ts`)
- `CartComponent` (`src/app/components/cart.component.ts`)
- `FullDescriptionComponent` (`src/app/components/fulldescription.component.ts`)
- `NotFoundComponent` (`src/app/components/notfounf.component.ts`, legacy filename typo retained)

## Services

- `BuyService`
- `ClientService`
- `OrderService`
- `AccountService`
- `PriceService`
- `ConnectorService` (`ConnetorService` legacy class spelling retained in codebase)
- `CoilService`
- `CreatingService`
- `ParsingService`

## Directives

- `ScrollDirective`
- `CheckPageDirective`
- `AddRemDirective`

## Models / enums / interfaces

- Classes: `Buy`, `Client`, `Order`, `Price`, `Connector`, `Wire`, `Coil`, `Image`
- Enums: `OrderStatus`, `CoreNumber`
- Interfaces: `Iitem`, `ICartBuy`

## Styling and assets

- Global styles: `src/app/styles/styles.css`
- Component style: `src/app/styles/app.component.css`
- Angular Material prebuilt theme: `deeppurple-amber`
- Assets: `src/assets/**`, image references also exist under `src/app/components/htmls/` and `src/coils.png`

## Test surface

- Unit/integration specs currently present under:
  - `src/app/services/*.spec.ts`
  - `src/app/components/app.component.spec.ts`
  - `src/app/models/buy.model.spec.ts`
