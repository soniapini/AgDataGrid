/* tslint:disable:no-string-literal */
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { DateInputEnum } from '../../models/date-input.enum';
import { DateFormatEnum } from '../../models/date-format.enum';

/**
 * Editor Custom AgGrid for Date DateTime Time Input.
 * Params:
 * - inputType: (Optional) it allows to specify 'DATE_TIME', 'DATE' or 'TIME'. Default value DATE.
 * - inputFormat: (Optional) it allows to specify 'SHORT' 'LONG' format for DATE_TIME, DATE e TIME. Default value SHORT.
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
  public inputFormat: DateFormatEnum;
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
    // this.value = params.value;
    this.cellWidth = params.column.getActualWidth() + 'px';

    this.inlineEditor = (this.params.api.getEditingCells().length) > 1;

    // Recupero parametri input
    this.configCellEditor();

    this.prepareValueForEditor(params.value);

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
    const inputTypeParam = this.params['inputType'];
    this.inputType = inputTypeParam ? inputTypeParam : DateInputEnum.DATE;
    console.log('Parametro inputType: ', this.inputType);

    const inputFormatParam = this.params['inputFormat'];
    this.inputFormat = inputFormatParam ? inputFormatParam : DateFormatEnum.SHORT;
    console.log('Parametro inputFormat: ', this.inputFormat);

    this.editInline = this.params['inlineEditor'];
    this.editInline = (this.editInline !== null && this.editInline !== undefined) ? this.editInline : true;
    console.log('Parametro editInline: ', this.editInline);

    this.inlineEditor = (this.params.api.getEditingCells().length) === 1 ? this.editInline : true;
  }

  private prepareValueForEditor(value: string) {
    switch (this.inputType) {
      case DateInputEnum.DATE:
        this.formatDate(value);
        break;
      case DateInputEnum.DATE_TIME:
        this.formatDateTime(value);
        break;
      case DateInputEnum.TIME:
        this.formatTime(value);
        break;
      default:
        console.log('parametro inputType non corretto: ', this.inputType);
        this.formatDate(value);
    }
  }

  private isValidDate(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  private formatDate(value: string) {
    const currentDate: Date = new Date(value);
    switch (this.inputFormat) {
      case DateFormatEnum.SHORT:
      case DateFormatEnum.LONG: // TODO capire che cosa è un formato lungo in input di una data
        if (this.isValidDate(currentDate)) {
          this.value = this.convertDateToString(currentDate);
        }
        break;
      default:
        console.log('parametro inputFormat non corretto: ', this.inputFormat);
        if (new Date(value) instanceof Date) {
          this.convertDateToString(currentDate);
        }
    }
  }

  private formatDateTime(value: string) {
    // 'SHORT': equivalent to 'yyyy-MM-ddThh:mm'
    // 'LONG': equivalent to 'yyyy-MM-ddThh:mm:ss'
    const currentDate: Date = new Date(value);
    this.value = '';

    if (this.isValidDate(currentDate)) {
      this.value = this.convertDateToString(currentDate);
      this.value += 'T' + this.convertTimeToString(currentDate);
    }
  }

  private formatTime(value: string) {
    // 'SHORT': equivalent to 'hh:mm'
    // 'LONG': equivalent to 'hh:mm:ss'
    const currentDate: Date = new Date(value);
    if (this.isValidDate(currentDate)) {
      this.value = this.convertTimeToString(currentDate);
    } else {
      this.value = value;
    }
  }

  private prependZero(n: number): string {
    if (n < 10) {
      return '0' + n;
    }
    return '' + n;
  }

  private convertDateToString(currentDate: Date): string {
    const year = currentDate.getFullYear();
    const month = this.prependZero(currentDate.getMonth() + 1);
    const day = this.prependZero(currentDate.getDate());
    const formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
  }

  private convertTimeToString(currentDate: Date): string {
    const hours = this.prependZero(currentDate.getUTCHours());
    const minutes = this.prependZero(currentDate.getUTCMinutes());
    const seconds = this.prependZero(currentDate.getUTCSeconds());
    let formattedString = '';
    formattedString += hours + ':' + minutes;

    if (this.inputFormat === DateFormatEnum.LONG) {
      formattedString += ':' + seconds;
    }
    return formattedString;
  }


}
