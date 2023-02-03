import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

const materialmodules = [MatToolbarModule, MatGridListModule, MatSidenavModule, MatDividerModule,
  MatListModule, MatMenuModule, MatButtonModule, MatIconModule, MatTreeModule, MatSelectModule,
  MatCardModule, MatDialogModule, MatInputModule, MatCheckboxModule];

@NgModule({
  imports: materialmodules,
  exports: materialmodules

})
export class MaterialModule {

}
