import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MaterialModule } from './material.module';
import { RouterBuysModule } from './router.module';
import { BuysComponent } from '../components/buys.component';
import { CartComponent } from '../components/cart.component';
import { CreatingComponent } from '../components/creating.component';
import { NotFoundComponent } from '../components/notfounf.component';
import { FullDescriptionComponent } from '../components/fulldescription.component';
import { AuthorizeComponent } from '../components/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDirective } from '../directives/scroll.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CheckPageDirective } from '../directives/check-page.directive';
import { AddRemDirective } from '../directives/addrem.directive';

@NgModule({
  declarations: [
    AppComponent,
    BuysComponent,
    CartComponent,
    CreatingComponent,
    NotFoundComponent,
    FullDescriptionComponent,
    ScrollDirective,
    CheckPageDirective,
    AddRemDirective,
    AuthorizeComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterBuysModule,
    FlexLayoutModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  entryComponents:[FullDescriptionComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
