import { AfterViewInit, Component } from '@angular/core';
import { BooleanCellEditorBaseComponent } from '../boolean-cell-editor-base/boolean-cell-editor-base.component';

@Component({
  selector: 'se-boolean-cell-editor-inline',
  templateUrl: './boolean-cell-editor-inline.component.html',
  styleUrls: ['./boolean-cell-editor-inline.component.scss']
})
export class BooleanCellEditorInlineComponent extends BooleanCellEditorBaseComponent implements AfterViewInit {

  constructor() {
    super();
   }

  ngAfterViewInit(): void {

  }

}
