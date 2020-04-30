import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HttpClientModule } from '@angular/common/http';
import {
  AlphanumericCellEditorComponent,
  BooleanCellRendererComponent,
  ColumnConstraintTooltipComponent,
  DateCellEditorComponent,
  DateCellRendererComponent,
  LetterCellEditorComponent,
  NumericCellEditorComponent,
  SeUiDatagridModule
} from 'se-ui-datagrid';
import { HomeComponent } from './pages/home/home.component';
import { BaseGridComponent } from './pages/base-grid/base-grid.component';
import { GridCommonService } from './services/grid-common.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ResponsiveGridComponent } from './pages/responsive-grid/responsive-grid.component';
import { HideColsComponent } from './pages/hide-cols/hide-cols.component';
import { APP_CONFIG } from './app.module.config';
import { DataRestClientService } from './services/data-rest-client.service';
import { DemoAppMockConfigService } from './services/demo-app-config.service';
import { RowResizeComponent } from './pages/row-resize/row-resize.component';
import { DateTimeGridComponent } from './pages/date-time-grid/date-time-grid.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BooleanGridComponent } from './pages/boolean-grid/boolean-grid.component';
import { ComboGridComponent } from './pages/combo-grid/combo-grid.component';
import { MasterDetailGridComponent } from './pages/master-detail-grid/master-detail-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseGridComponent,
    ResponsiveGridComponent,
    PageNotFoundComponent,
    HideColsComponent,
    RowResizeComponent,
    DateTimeGridComponent,
    BooleanGridComponent,
    ComboGridComponent,
    MasterDetailGridComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([
      NumericCellEditorComponent,
      LetterCellEditorComponent,
      AlphanumericCellEditorComponent,
      ColumnConstraintTooltipComponent,
      DateCellEditorComponent,
      DateCellRendererComponent,
      DateCellEditorComponent,
      BooleanCellRendererComponent]),
    SeUiDatagridModule
  ],
  providers: [
    GridCommonService,
    DataRestClientService,
    DatePipe,
    {provide: APP_CONFIG, useClass: DemoAppMockConfigService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
