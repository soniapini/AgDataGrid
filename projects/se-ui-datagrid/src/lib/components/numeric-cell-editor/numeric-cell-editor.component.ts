import { Component, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';

// TODO
// Definire con Ebit come vogliono visualizzare/gestire gli errori
// Capire anche se non far aggiornare i valori quando invalidi o se evidenziare l'errore anche
// nella cella quando non siamo in edit

@Component({
  selector: 'lib-numeric-cell-editor',
  templateUrl: './numeric-cell-editor.component.html',
  styleUrls: ['./numeric-cell-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumericCellEditorComponent implements ICellEditorAngularComp {

  public max: number; // i parametri di input si recuperano in agInit da params es, params['max']
  public min: number; // i parametri di input si recuperano in agInit da params es, params['min']

  value: number;
  params: ICellEditorParams;
  cellWidth: string;
  formControl: FormControl;
  // matcher = new SeErrorStateMatcher();
  inlineEditor: boolean;

  // @ViewChild('container', {read: ViewContainerRef}) public container;
  //  @ViewChild('numericInput', { static: false, read: ElementRef}) numericInput: ElementRef;

  constructor() {
  }

  // ngAfterViewInit(): void {
  //   window.setTimeout(() => {
  //         this.numericInput.nativeElement.focus();
  //       }, 0);
  // }

  // afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  //   // this.numericEditor.focus();
  //   window.setTimeout(() => {
  //     this.numericInput.element.nativeElement.focus();
  //   }, 0);
  // }

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = params.value;

    this.inlineEditor = (this.params.api.getEditingCells().length) > 1;

    this.cellWidth = params.column.getActualWidth() + 'px';

    // Recupero parametri input
    this.max = this.params['max'];
    console.log('Parametro max: ', this.max);

    this.min = this.params['min'];
    console.log('Parametro min: ', this.min);
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
    // è possibile campire se siamo in edit di tutta la riga per non fare aprire il popup
    // TODO occorre gestire 2 template differenti uno per popup e no.
    // TODO Chiedere se è una cosa che Ebit ritiene utile.
    return (this.params.api.getEditingCells().length) === 1 ? true : false;
  }

  private preventDefaultAndPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  _onFormReady(editorFromControl: FormControl) {
    this.formControl = editorFromControl;
  }
}
