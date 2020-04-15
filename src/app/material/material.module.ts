import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

const MaterialComponent = [
  MatRadioModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
];

@NgModule({
  imports: [ MaterialComponent ],
  exports: [ MaterialComponent ]
})
export class MaterialModule { }
