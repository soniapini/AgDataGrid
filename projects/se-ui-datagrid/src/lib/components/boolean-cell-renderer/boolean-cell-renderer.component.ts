/* tslint:disable:no-string-literal */
import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { BoolEditor, MatColor } from '../../models/commons.enum';
import { ICellRendererParams } from 'ag-grid-community';

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
  styleUrls: ['./boolean-cell-renderer.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BooleanCellRendererComponent implements ICellRendererAngularComp {
  public checked: boolean;
  public disabled: boolean;
  public color: MatColor;
  public editor: BoolEditor;

  private params: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.checked = this.params.value;
    this.disabled = this.params['disabled'] || false;
    this.color = this.params['color'] || MatColor.PRIMARY;
    this.editor = this.params['editor'] || BoolEditor.CHECKBOX;
  }

  onChange(checked: boolean) {
    this.checked = checked;
    this.params.node.setDataValue(this.params.column, this.checked);
  }

  refresh(params: any): boolean {
    return false;
  }
}
