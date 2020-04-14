import { Component, Input } from '@angular/core';
import { NumericCellEditorBaseComponent } from '../numeric-cell-editor-base/numeric-cell-editor-base.component';

@Component({
  selector: 'lib-numeric-cell-editor-popup',
  templateUrl: './numeric-cell-editor-popup.component.html',
  styleUrls: ['./numeric-cell-editor-popup.component.scss']
})
export class NumericCellEditorPopupComponent extends NumericCellEditorBaseComponent {

  @Input() width: string;

}
