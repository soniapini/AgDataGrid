import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const MaterialComponent = [
  MatRadioModule,
  MatCardModule,
  MatButtonModule

];

@NgModule({
  imports: [ MaterialComponent ],
  exports: [ MaterialComponent ]
})
export class MaterialModule { }
