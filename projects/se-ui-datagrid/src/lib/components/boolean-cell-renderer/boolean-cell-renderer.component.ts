/* tslint:disable:no-string-literal */
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { BoolEditor, MatColor } from '../../models/commons.enum';

/**
 * Editor Custom AgGrid for Booleans Input.
 * Params:
 * - disabled: (Optional) it define if in-line editing is allowed or not.
 * - color: (Optional) it allows to specify witch standard material color  to apply  'PRIMARY' 'ACCENT', 'WARN'.
 * - editor (Default true) it allows to specify witch material component to show, 'CHECKBOX' or 'SLIDETOGGLE.
 */

@Component({
  selector: 'se-boolean-cell-renderer',
  templateUrl: './boolean-cell-renderer.component.html',
  styleUrls: ['./boolean-cell-renderer.component.scss']
})
export class BooleanCellRendererComponent implements ICellRendererAngularComp {
  private params: any;

  public checked: boolean = false;
  public disabled: boolean = false;
  public color: MatColor = MatColor.PRIMARY;
  public editor: BoolEditor = BoolEditor.CHECKBOX;

  agInit(params: any): void {
    this.params = params;
    this.checked = this.params.value === 'YES';
    this.disabled = this.params.disabled;
    this.color = this.params.color;
    this.editor = this.params.editor;
  }

  onChange(checked: boolean) {
    this.checked = checked;
    this.params.node.setDataValue(this.params.colDef, this.checked ? "YES" : "NO");
  }

  refresh(params: any): boolean {
    return false;
  }
}
