import { Component } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams } from 'ag-grid-community';

@Component({
  selector: 'se-not-admissible-chars-tooltip',
  templateUrl: './column-constraint-tooltip.component.html',
  styleUrls: ['./column-constraint-tooltip.component.scss']
})
export class ColumnConstraintTooltipComponent implements ITooltipAngularComp {

  params: ITooltipParams;
  data: any;
  isHeader: boolean;
  isNumericCell: boolean;

  constructor() {
    this.data = {};
  }

  agInit(params: ITooltipParams): void {
    this.params = params;
    this.isHeader = params.rowIndex === undefined;
    if (!this.isHeader) {
      this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    }
    this.isNumericCell = this.params['cellType'] === 'numeric';

    this.data.notAdmissibleChars = this.params['notAdmissibleChars'] || '--';

    this.data.min = this.params['min'];
    this.data.max = this.params['max'];
    this.data.decimal = this.params['decimal'];
  }

}
