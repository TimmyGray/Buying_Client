import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from '../components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MaterialModule } from './material.module';
import { RouterBuysModule } from './router.module';
import { BuysComponent } from '../components/buys.component';
import { CartComponent } from '../components/cart.component';
import { CreatingComponent } from '../components/creating.component';
import { NotFoundComponent } from '../components/notfounf.component';
import { FullDescriptionComponent } from '../components/fulldescription.component';
import { FormsModule } from '@angular/forms';
import { ScrollDirective } from '../directives/scroll.directive';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CheckPageDirective } from '../directives/check-page.directive';
import { AddRemDirective } from '../directives/addrem.directive';

@NgModule({ declarations: [
        AppComponent,
        BuysComponent,
        CartComponent,
        CreatingComponent,
        NotFoundComponent,
        FullDescriptionComponent,
        ScrollDirective,
        CheckPageDirective,
        AddRemDirective
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        RouterBuysModule,
        FlexLayoutModule,
        FormsModule,
        ScrollingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
