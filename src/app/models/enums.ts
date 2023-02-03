import { from } from "rxjs";

export enum OrderStatus {
  under_consideration,
  agree,
  done,
  canceled
}

export enum Connector {

  trs_m,
  ts_m,
  xlr_m,
  rca_m,
  trs_f,
  ts_f,
  xlr_f,
  rca_f,
  bnc

}

export enum CoreNumber {

  one_ground,
  two_ground,
  three_ground,
  four_ground,
  five_ground,
  four_by_two_ground,
  eight_by_two_ground,

}

const connectors_prices: number[] = [1, 0.8, 2, 0.5, 1, 0.8, 2, 0.5, 3];
const wires_prices: number[] = [1,1,1.5,1.8,2,2.5,3];

export const Connectors = new Map();
export const Cores = new Map();

for (var k = 0; k < wires_prices.length; k++) {

  let core: string = CoreNumber[k];
  if (core == null || core == "" || core == undefined) {

    break;

  }

  Cores.set(core, wires_prices[k]);


}

for (var i = 0; i < connectors_prices.length; i++) {

  let connector: string = Connector[i];
  if (connector == null || connector == "" || connector == undefined) {
    break;
  }

  Connectors.set(connector, connectors_prices[i]);

}


