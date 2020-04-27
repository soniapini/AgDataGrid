import { Component, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { DateInputEnum } from '../../models/date-input.enum';

/**
 * Editor Custom AgGrid for Date DateTime Time Input.
 * Params:
 * - inputType: (Optional) it allows to specify 'DATE_TIME', 'DATE' or 'TIME'
 * - inlineEditor (Default true) it allows to specify the preference between online or popup editor version.
 *  NOTE: when in the AgGrid is enabled the fullRow editing this input param is ignored and the editor will be inline
 */
@Component({
  selector: 'se-date-cell-editor',
  templateUrl: './date-cell-editor.component.html',
  styleUrls: ['./date-cell-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DateCellEditorComponent implements ICellEditorAngularComp {
  public inputType: DateInputEnum;
  public editInline: boolean;

  value: string;
  params: ICellEditorParams;
  cellWidth: string;
  cellStartEdited: boolean;
  formControl: FormControl;
  inlineEditor: boolean;

  constructor() {
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = params.value;

    this.cellWidth = params.column.getActualWidth() + 'px';

    this.inlineEditor = (this.params.api.getEditingCells().length) > 1;

    // Recupero parametri input
    this.configCellEditor();

    this.cellStartEdited = this.params.cellStartedEdit;

  }

  getValue(): any {
    if (this.formControl && !this.formControl.invalid) {
      // Alla chiusura dell'editor se il campo è valido aggiorniamo il valore altrimenti no
      this.value = this.formControl.value;
    }
    return this.value;
  }

  isPopup(): boolean {
    return !this.editInline;
  }

  _onFormReady(editorFromControl: FormControl) {
    this.formControl = editorFromControl;
  }

  private configCellEditor() {
    this.inputType = this.params['inputType'];
    console.log('Parametro inputType: ', this.inputType);

    this.editInline = this.params['inlineEditor'];
    this.editInline = (this.editInline !== null && this.editInline !== undefined) ? this.editInline : true;
    console.log('Parametro editInline: ', this.editInline);

    this.inlineEditor = (this.params.api.getEditingCells().length) === 1 ? this.editInline : true;
  }

}
