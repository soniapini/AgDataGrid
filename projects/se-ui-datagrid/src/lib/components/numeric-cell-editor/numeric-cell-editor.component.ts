import { Component, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-numeric-cell-editor',
  templateUrl: './numeric-cell-editor.component.html',
  styleUrls: ['./numeric-cell-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumericCellEditorComponent implements ICellEditorAngularComp {

  public max: number; // i parametri di input si recuperano in agInit da params es, params['max']
  public min: number; // i parametri di input si recuperano in agInit da params es, params['min']
  public editInline: boolean; // i parametri di input si recuperano in agInit da params es, params['editInPopup']

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
    this.max = this.params['max'];
    console.log('Parametro max: ', this.max);

    this.min = this.params['min'];
    console.log('Parametro min: ', this.min);

    this.editInline = this.params['editInline'];
    this.editInline = this.editInline ? this.editInline : true;
    console.log('Parametro editInline: ', this.editInline);


    this.inlineEditor = (this.params.api.getEditingCells().length) === 1 ? this.editInline : true;
  }
}
