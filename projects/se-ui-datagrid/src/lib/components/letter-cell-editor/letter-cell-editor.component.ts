import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-letter-cell-editor',
  templateUrl: './letter-cell-editor.component.html',
  styleUrls: ['./letter-cell-editor.component.scss']
})
export class LetterCellEditorComponent implements ICellEditorAngularComp {

  public editInline: boolean; // i parametri di input si recuperano in agInit da params es, params['editInPopup']
  public notAllowed: RegExp; // i parametri di input si recuperano in agInit da params es, params['notAllowedChars']

  value: number;
  params: ICellEditorParams;
  cellStartEdited: boolean;
  cellWidth: string;
  formControl: FormControl;
  inlineEditor: boolean; // TODO potrebbe diventare un parametro di input dalla grid

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

  // focusIn(): void {
  // }

  // focusOut(): void {
  //   this.params.stopEditing();
  // }

  //
  // getFrameworkComponentInstance(): any {
  // }

  getValue(): any {
    if (this.formControl && !this.formControl.invalid) {
      // Alla chiusura dell'editor se il campo è valido aggiorniamo il valore altrimenti no
      this.value = this.formControl.value;
    }
    return this.value;
  }

  // isCancelAfterEnd(): boolean {
  //   // return this.cancelAfterEnd;
  //
  //   // example - will reject the number if it contains the value 007
  //   // - not very practical, but demonstrates the method.
  //   const value = this.getValue();
  //   return value.indexOf('007') >= 0;
  //   return false;
  // }

  isCancelBeforeStart(): boolean {
    return false;
  }

  isPopup(): boolean {
    return !this.editInline;
  }

  private preventDefaultAndPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  _onFormReady(editorFromControl: FormControl) {
    this.formControl = editorFromControl;
  }

  private configCellEditor() {

    this.editInline = this.params['editInline'];
    this.editInline = this.editInline ? this.editInline : true;
    console.log('Parametro editInline: ', this.editInline);

    this.notAllowed = this.params['notAllowedChars'];


    this.inlineEditor = (this.params.api.getEditingCells().length) === 1 ? this.editInline : true;
  }

}
