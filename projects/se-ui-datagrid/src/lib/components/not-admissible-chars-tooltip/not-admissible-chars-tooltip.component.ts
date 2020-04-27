import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

@Component({
  selector: 'se-not-admissible-chars-tooltip',
  templateUrl: './not-admissible-chars-tooltip.component.html',
  styleUrls: ['./not-admissible-chars-tooltip.component.scss']
})
export class NotAdmissibleCharsTooltipComponent implements ITooltipAngularComp {

  params: ITooltipParams;
  data: any;
  isHeader: boolean;

  constructor() {
    this.data = {};
  }

  agInit(params: ITooltipParams): void {
    this.params = params;
    this.isHeader = params.rowIndex === undefined;
    if (!this.isHeader) {
      this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    }
    this.data.notAdmissibleChars = this.params['notAdmissibleChars'] || '--';
  }

}
