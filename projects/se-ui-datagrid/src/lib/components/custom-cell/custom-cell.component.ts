import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'lib-custom-cell',
  templateUrl: './custom-cell.component.html',
  styleUrls: ['./custom-cell.component.scss']
})
export class CustomCellComponent implements OnInit, ICellRendererAngularComp {
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
