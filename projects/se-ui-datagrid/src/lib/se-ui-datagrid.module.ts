import { NgModule } from '@angular/core';
import { SeUiDatagridComponent } from './se-ui-datagrid.component';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumericCellEditorComponent } from './components/numeric-cell-editor/numeric-cell-editor.component';
import { CustomCellComponent } from './components/custom-cell/custom-cell.component';
import { NumericCellEditorPopupComponent } from './components/numeric-cell-editor/numeric-cell-editor-popup/numeric-cell-editor-popup.component';
import { CommonModule } from '@angular/common';
import { NumericCellEditorInlineComponent } from './components/numeric-cell-editor/numeric-cell-editor-inline/numeric-cell-editor-inline.component';
import { NumericCellEditorBaseComponent } from './components/numeric-cell-editor/numeric-cell-editor-base/numeric-cell-editor-base.component';
import { LetterCellEditorComponent } from './components/letter-cell-editor/letter-cell-editor.component';
import { LetterCellEditorInlineComponent } from './components/letter-cell-editor/letter-cell-editor-inline/letter-cell-editor-inline.component';
import { LetterCellEditorPopupComponent } from './components/letter-cell-editor/letter-cell-editor-popup/letter-cell-editor-popup.component';
import { LetterCellEditorBaseComponent } from './components/letter-cell-editor/letter-cell-editor-base/letter-cell-editor-base.component';
import { AlphanumericCellEditorComponent } from './components/alphanumeric-cell-editor/alphanumeric-cell-editor.component';
import { AlphanumericCellEditorBaseComponent } from './components/alphanumeric-cell-editor/alphanumeric-cell-editor-base/alphanumeric-cell-editor-base.component';
import { AlphanumericCellEditorInlineComponent } from './components/alphanumeric-cell-editor/alphanumeric-cell-editor-inline/alphanumeric-cell-editor-inline.component';
import { AlphanumericCellEditorPopupComponent } from './components/alphanumeric-cell-editor/alphanumeric-cell-editor-popup/alphanumeric-cell-editor-popup.component';
// import { NgxMaskModule } from 'ngx-mask';
import { ColumnConstraintTooltipComponent } from './components/column-constraint-tooltip/column-constraint-tooltip.component';
import { DateCellEditorComponent } from './components/date-cell-editor/date-cell-editor.component';
import { DateCellEditorBaseComponent } from './components/date-cell-editor/date-cell-editor-base/date-cell-editor-base.component';
import { DateCellEditorInlineComponent } from './components/date-cell-editor/date-cell-editor-inline/date-cell-editor-inline.component';
import { BooleanCellRendererComponent } from './components/boolean-cell-renderer/boolean-cell-renderer.component';

@NgModule({
  declarations: [
    NumericCellEditorComponent,
    CustomCellComponent,
    SeUiDatagridComponent,
    NumericCellEditorComponent,
    NumericCellEditorBaseComponent,
    NumericCellEditorPopupComponent,
    NumericCellEditorInlineComponent,
    LetterCellEditorComponent,
    LetterCellEditorInlineComponent,
    LetterCellEditorPopupComponent,
    LetterCellEditorBaseComponent,
    AlphanumericCellEditorComponent,
    AlphanumericCellEditorBaseComponent,
    AlphanumericCellEditorInlineComponent,
    AlphanumericCellEditorPopupComponent,
    ColumnConstraintTooltipComponent,
    DateCellEditorComponent,
    DateCellEditorBaseComponent,
    DateCellEditorInlineComponent,
    BooleanCellRendererComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatSlideToggleModule,
    AgGridModule.withComponents([]),
    // NgxMaskModule.forRoot(),
    CommonModule
  ],
  exports: [
    NumericCellEditorComponent,
    LetterCellEditorComponent,
    AlphanumericCellEditorComponent,
    CustomCellComponent,
    SeUiDatagridComponent,
    ColumnConstraintTooltipComponent,
    DateCellEditorComponent
  ]
})
export class SeUiDatagridModule {
}
