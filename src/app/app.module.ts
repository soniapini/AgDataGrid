import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumericCellEditorComponent } from './components/numeric-cell-editor/numeric-cell-editor.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { CustomDateCellComponent } from './components/custom-date-cell/custom-date-cell.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    NumericCellEditorComponent,
    CustomDateCellComponent
  ],
  exports: [
    NumericCellEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatSlideToggleModule,
    AgGridModule.withComponents([NumericCellEditorComponent]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
