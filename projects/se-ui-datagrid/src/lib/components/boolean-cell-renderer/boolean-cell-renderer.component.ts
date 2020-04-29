import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'se-boolean-cell-renderer',
  templateUrl: './boolean-cell-renderer.component.html',
  styleUrls: ['./boolean-cell-renderer.component.scss']
})
export class BooleanCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  public checked: boolean = false;
  public disabled: boolean = false;
  public color: string;
  public editor: string;

  agInit(params: any): void {
    this.params = params;
    this.checked = this.params.value === 'YES';
    this.disabled = this.params.disabled;
    this.color = this.params.color;
    this.editor = this.params.editor;
    console.log('color: ', this.color);
  }

  onChange(checked: boolean) {
    this.checked = checked;
    this.params.node.setDataValue(this.params.colDef, this.checked ? "YES" : "NO");
  }

  refresh(params: any): boolean {
    return false;
  }
}
