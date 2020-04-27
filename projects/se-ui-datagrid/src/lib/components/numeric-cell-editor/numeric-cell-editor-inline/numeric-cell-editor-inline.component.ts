import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';
import { NumericCellEditorBaseComponent } from '../numeric-cell-editor-base/numeric-cell-editor-base.component';

/**
 * InLine Numeric Input Custom Editor
 */
@Component({
  selector: 'se-numeric-cell-editor-inline',
  templateUrl: './numeric-cell-editor-inline.component.html',
  styleUrls: ['./numeric-cell-editor-inline.component.scss'],
})
export class NumericCellEditorInlineComponent extends NumericCellEditorBaseComponent implements AfterViewInit {
  /**
   * If doing fullRow edit, this is true if the cell is the one that started the edit
   * otherwise this is always true
   */
  @Input() startEdited: boolean;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.startEdited) {
      window.setTimeout(() => {
        this.numericInput.nativeElement.focus();
        this.formReady.emit(this.formControl);
      }, 0);
    }
  }
}
