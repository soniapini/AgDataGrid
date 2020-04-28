import { Component, ViewEncapsulation } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { ICellEditorAngularComp } from 'ag-grid-angular';

/**
 * Editor Custom AgGrid for Boolean Input.
 */
@Component({
  selector: 'se-boolean-cell-editor',
  templateUrl: './boolean-cell-editor.component.html',
  styleUrls: ['./boolean-cell-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BooleanCellEditorComponent implements ICellEditorAngularComp {

  public editInline: boolean;

  value: boolean;
  params: ICellEditorParams;
  cellStartEdited: boolean;
  cellWidth: string;
  formControl: FormControl;
  inlineEditor: boolean;

  constructor() {
  }

  agInit(): void {
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
    this.editInline = this.params['inlineEditor'];
    this.editInline = (this.editInline !== null && this.editInline !== undefined) ? this.editInline : true;
    console.log('Parametro editInline: ', this.editInline);
    this.inlineEditor = (this.params.api.getEditingCells().length) === 1 ? this.editInline : true;
  }

}
