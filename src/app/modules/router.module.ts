import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuysComponent } from '../components/buys.component';
import { CreatingComponent } from '../components/creating.component';
import { CartComponent } from '../components/cart.component';
import { NotFoundComponent } from '../components/notfounf.component';

const routes: Routes = [
  { path: "", component: BuysComponent },
  { path: "creating", component: CreatingComponent },
  { path: "cart", component: CartComponent },
  { path: "**", component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [ ],
  exports: [RouterModule]
})
export class RouterBuysModule {

}
