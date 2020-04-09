import { NgModule } from '@angular/core';
import { SeUiDatagridComponent } from './se-ui-datagrid.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericCellEditorComponent } from './components/numeric-cell-editor/numeric-cell-editor.component';
import { CustomDateCellComponent } from './components/custom-date-cell/custom-date-cell.component';


@NgModule({
  declarations: [
    NumericCellEditorComponent,
    CustomDateCellComponent,
    SeUiDatagridComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatSlideToggleModule,
    AgGridModule.withComponents([])
  ],
  exports: [
    NumericCellEditorComponent,
    CustomDateCellComponent,
    SeUiDatagridComponent
  ]
})
export class SeUiDatagridModule {
}
