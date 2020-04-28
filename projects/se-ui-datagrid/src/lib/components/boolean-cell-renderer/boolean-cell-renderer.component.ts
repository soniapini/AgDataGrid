import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'se-boolean-cell-renderer',
  templateUrl: './boolean-cell-renderer.component.html',
  styleUrls: ['./boolean-cell-renderer.component.scss']
})
export class BooleanCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  private checked: boolean = false;
  public disabled: boolean = false;

  agInit(params: any): void {
    this.params = params;
    this.disabled = this.params.disabled;
    this.checked = this.params.value === "On";
  }

  // demonstrates how you can do "inline" editing of a cell
  onChange(checked: boolean) {
    this.checked = checked;
    this.params.node.setDataValue(this.params.colDef, this.checked ? "On" : "Off");
  }

  refresh(params: any): boolean {
    return false;
  }
}
