import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-date-cell',
  templateUrl: './custom-date-cell.component.html',
  styleUrls: ['./custom-date-cell.component.scss']
})
export class CustomDateCellComponent implements OnInit, ICellRendererAngularComp {
  cellValue: any;
  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: any) {
    this.cellValue = params.value;
  }

  refresh(params: any): boolean {
    this.cellValue = params.value;
    return true;
  }

}
