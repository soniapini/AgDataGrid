import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { LetterCellEditorComponent, NumericCellEditorComponent, SeUiDatagridModule } from 'se-ui-datagrid';
import { HomeComponent } from './pages/home/home.component';
import { BaseGridComponent } from './pages/base-grid/base-grid.component';
import { GridCommonService } from './services/grid-common.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseGridComponent,
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([NumericCellEditorComponent, LetterCellEditorComponent]),
    SeUiDatagridModule
  ],
  providers: [ GridCommonService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {  }
}
