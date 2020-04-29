/* tslint:disable:no-string-literal */
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { DateInputEnum } from '../../models/date-input.enum';
import { DateFormatEnum } from '../../models/date-format.enum';

@Component({
  selector: 'se-date-cell-renderer',
  templateUrl: './date-cell-renderer.component.html',
  styleUrls: ['./date-cell-renderer.component.scss']
})
export class DateCellRendererComponent implements ICellRendererAngularComp {
  public inputType: DateInputEnum;
  public inputFormat: DateFormatEnum;

  value: Date;
  params: ICellRendererParams;
  viewFormat: string;

  constructor() {
  }


  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.value = params.value;
    this.configCellEditor();
    this.defineViewFormat();
  }

  refresh(params: any): boolean {
    return false;
  }

  private configCellEditor() {
    const inputTypeParam = this.params['inputType'];
    this.inputType = inputTypeParam ? inputTypeParam : DateInputEnum.DATE;
    console.log('Parametro inputType: ', this.inputType);

    const inputFormatParam = this.params['inputFormat'];
    this.inputFormat = inputFormatParam ? inputFormatParam : DateFormatEnum.SHORT;
    console.log('Parametro inputFormat: ', this.inputFormat);
  }

  private defineViewFormat() {
    switch (this.inputType) {
      case DateInputEnum.DATE_TIME:
        if (this.inputFormat === DateFormatEnum.SHORT) {
          this.viewFormat = 'dd/MM/yyyy, hh:mm';
        } else {
          this.viewFormat = 'dd MMMM, y hh:mm:ss';
        }
        break;
      case DateInputEnum.DATE:
        if (this.inputFormat === DateFormatEnum.SHORT) {
          this.viewFormat = 'dd/MM/yyyy';
        } else {
          this.viewFormat = 'dd MMMM, y';
        }
        break;
      case DateInputEnum.TIME:
        if (this.inputFormat === DateFormatEnum.SHORT) {
          this.viewFormat = 'hh:mm';
        } else {
          this.viewFormat = 'hh:mm:ss';
        }
        break;
    }


  }
}
