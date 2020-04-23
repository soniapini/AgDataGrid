import { Component } from '@angular/core';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'se-alphanumeric-cell-editor',
  templateUrl: './alphanumeric-cell-editor.component.html',
  styleUrls: ['./alphanumeric-cell-editor.component.scss']
})
export class AlphanumericCellEditorComponent implements ICellEditorAngularComp {

  public editInline: boolean; // i parametri di input si recuperano in agInit da params es, params['editInPopup']
  public notAdmissibleChars: Array<string>;

  value: string;
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
    this.editInline = this.params['inlineEditor'];
    this.editInline = (this.editInline !== null && this.editInline !== undefined) ? this.editInline : true;
    console.log('Parametro editInline: ', this.editInline);

    this.notAdmissibleChars = this.params['notAdmissibleChars'];

    this.inlineEditor = (this.params.api.getEditingCells().length) === 1 ? this.editInline : true;
  }
}
