import { Component, ViewEncapsulation } from '@angular/core';
import { NumericCellEditorBaseComponent } from '../numeric-cell-editor-base/numeric-cell-editor-base.component';

@Component({
  selector: 'lib-numeric-cell-editor-inline',
  templateUrl: './numeric-cell-editor-inline.component.html',
  styleUrls: ['./numeric-cell-editor-inline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumericCellEditorInlineComponent extends NumericCellEditorBaseComponent {

  constructor() {
    super();
  }
}
