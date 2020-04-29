/* tslint:disable:no-string-literal */
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';

/**
 * Editor Custom AgGrid for Numeric Input.
 * Params:
 * - min: (Optional) it allows to specify the minimum admissible value
 * - max: (Optional) it allows to specify the maximum admissible value
 * - decimal: (Optional. Default value 0) it allows to specify the number of decimals
 * - inlineEditor (Default true) it allows to specify the preference between online or popup editor version.
 *  NOTE: when in the AgGrid is enabled the fullRow editing this input param is ignored and the editor will be inline
 */
@Component({
  selector: 'se-numeric-cell-editor',
  templateUrl: './numeric-cell-editor.component.html',
  styleUrls: ['./numeric-cell-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumericCellEditorComponent implements ICellEditorAngularComp {

  public max: number; // i parametri di input si recuperano in agInit da params es, params['max']
  public min: number;
  public decimal: number;
  public editInline: boolean;

  value: number;
  params: ICellEditorParams;
  cellStartEdited: boolean;
  cellWidth: string;
  formControl: FormControl;
  inlineEditor: boolean;

  constructor() {
  }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = params.value;

    this.inlineEditor = (this.params.api.getEditingCells().length) > 1;

    this.cellWidth = params.column.getActualWidth() + 'px';

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

  isCancelBeforeStart(): boolean {
    return false;
  }

  isPopup(): boolean {
    return !this.editInline;
  }

  _onFormReady(editorFromControl: FormControl) {
    this.formControl = editorFromControl;
  }

  private configCellEditor() {
    this.max = this.params['max'];
    console.log('Parametro max: ', this.max);

    this.min = this.params['min'];
    console.log('Parametro min: ', this.min);

    this.decimal = this.params['decimal'];
    this.decimal = this.decimal ? this.decimal : 0;
    console.log('Parametro decimal: ', this.decimal);

    this.editInline = this.params['inlineEditor'];
    this.editInline = (this.editInline !== null && this.editInline !== undefined) ? this.editInline : true;
    console.log('Parametro editInline: ', this.editInline);

    this.inlineEditor = (this.params.api.getEditingCells().length) === 1 ? this.editInline : true;
  }
}
