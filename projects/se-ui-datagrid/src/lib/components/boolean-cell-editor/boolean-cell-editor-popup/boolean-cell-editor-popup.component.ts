import { AfterViewInit, Component } from '@angular/core';
import { BooleanCellEditorBaseComponent } from '../boolean-cell-editor-base/boolean-cell-editor-base.component';

@Component({
  selector: 'se-boolean-cell-editor-popup',
  templateUrl: './boolean-cell-editor-popup.component.html',
  styleUrls: ['./boolean-cell-editor-popup.component.scss']
})
export class BooleanCellEditorPopupComponent extends BooleanCellEditorBaseComponent implements AfterViewInit {

  constructor() {
    super();
   }

  ngAfterViewInit(): void {

  }

}
