import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuysComponent } from '../components/buys.component';
import { CreatingComponent } from '../components/creating.component';
import { CartComponent } from '../components/cart.component';
import { NotFoundComponent } from '../components/notfounf.component';
import { AuthorizeComponent } from '../components/auth.component';

const routes: Routes = [
  { path: "creating", component: CreatingComponent },
  { path: "cart", component: CartComponent },
  { path: "authorize/:isreg", component: AuthorizeComponent },
  { path: "", component: BuysComponent },
  { path: "**", redirectTo: "/" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [ ],
  exports: [RouterModule]
})
export class RouterBuysModule {

}
