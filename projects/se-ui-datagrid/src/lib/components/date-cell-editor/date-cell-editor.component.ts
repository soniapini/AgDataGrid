/* tslint:disable:no-string-literal */
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { FormControl } from '@angular/forms';
import { DateInputEnum } from '../../models/date-input.enum';
import { DateFormatEnum } from '../../models/date-format.enum';
import { DetectUserAgent } from '../../utils/detect-user-agent';

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
  originalValue: Date;
  params: ICellEditorParams;
  cellWidth: string;
  cellStartEdited: boolean;
  formControl: FormControl;
  inlineEditor: boolean;

  constructor(private detectUserAgent: DetectUserAgent) {
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
      // TODO aggiornare la data originale con le modifiche apportate
      this.updateOriginalValue();
    }
    return this.originalValue;
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
    const isIEOrFireFoxOrSafari = this.detectUserAgent.isIE() || this.detectUserAgent.isFF()
      || this.detectUserAgent.isSafari();
    if (this.inputType === DateInputEnum.DATE_TIME && isIEOrFireFoxOrSafari) {
      this.inputType = DateInputEnum.DATE_TIME_OLD;
    }
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
    this.originalValue = new Date(value);
    switch (this.inputFormat) {
      case DateFormatEnum.SHORT:
      case DateFormatEnum.LONG: // TODO capire che cosa è un formato lungo in input di una data
        if (this.isValidDate(this.originalValue)) {
          this.value = this.convertDateToString();
        }
        break;
      default:
        console.log('parametro inputFormat non corretto: ', this.inputFormat);
        if (new Date(value) instanceof Date) {
          this.convertDateToString();
        }
    }
  }

  private formatDateTime(value: string) {
    // 'SHORT': equivalent to 'yyyy-MM-ddThh:mm'
    // 'LONG': equivalent to 'yyyy-MM-ddThh:mm:ss'
    this.originalValue = new Date(value);
    this.value = '';

    if (this.isValidDate(this.originalValue)) {
      this.value = this.convertDateToString();
      this.value += 'T' + this.convertTimeToString();
    }
  }

  private formatTime(value: string) {
    // 'SHORT': equivalent to 'hh:mm'
    // 'LONG': equivalent to 'hh:mm:ss'
    this.originalValue = new Date(value);
    if (this.isValidDate(this.originalValue)) {
      this.value = this.convertTimeToString();
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

  private convertDateToString(): string {
    const year = this.originalValue.getFullYear();
    const month = this.prependZero(this.originalValue.getMonth() + 1);
    const day = this.prependZero(this.originalValue.getDate());
    const formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
  }

  private convertTimeToString(): string {
    // const hours = this.prependZero(this.originalValue.getUTCHours());
    // const minutes = this.prependZero(this.originalValue.getUTCMinutes());
    // const seconds = this.prependZero(this.originalValue.getUTCSeconds());
    const hours = this.prependZero(this.originalValue.getHours());
    const minutes = this.prependZero(this.originalValue.getMinutes());
    const seconds = this.prependZero(this.originalValue.getSeconds());
    let formattedString = '';
    formattedString += hours + ':' + minutes;

    if (this.inputFormat === DateFormatEnum.LONG) {
      formattedString += ':' + seconds;
    }
    return formattedString;
  }

  private updateOriginalValue() {
    switch (this.inputType) {
      case DateInputEnum.DATE_TIME:
        this.originalValue = new Date(this.value);
        break;
      case DateInputEnum.DATE:
        // prendiamo la data aggioranta da this.value ma il time lasciamo quello originale
        const generatedDate = new Date(this.value);
        // generatedDate.setHours(this.originalValue.getUTCHours(), this.originalValue.getUTCMinutes(), this.originalValue.getUTCSeconds());
        generatedDate.setHours(this.originalValue.getHours(), this.originalValue.getMinutes(), this.originalValue.getSeconds());
        this.originalValue = generatedDate;
        break;
      case DateInputEnum.TIME:
        // prendiamo il time da this.value ma la data lasciamo quella originale
        const hours = this.value.split(':');
        if (hours.length === 3) {
          this.originalValue.setHours(parseInt(hours[0], 10), parseInt(hours[1], 10), parseInt(hours[2], 10));
        } else if (hours.length === 2) {
          this.originalValue.setHours(parseInt(hours[0], 10), parseInt(hours[1], 10));
        } else {
          this.originalValue.setHours(0);
        }
        break;
    }
  }
}
