import { AfterViewInit, Component, Input } from '@angular/core';
import { DateCellEditorBaseComponent } from '../date-cell-editor-base/date-cell-editor-base.component';

/**
 * Inline DateTime/Date/Time Input Custom Editor
 */
@Component({
  selector: 'se-date-cell-editor-inline',
  templateUrl: './date-cell-editor-inline.component.html',
  styleUrls: ['./date-cell-editor-inline.component.scss']
})
export class DateCellEditorInlineComponent extends DateCellEditorBaseComponent implements AfterViewInit {

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
        this.dateInput.nativeElement.focus();
        this.formReady.emit(this.formControl);
      }, 0);
    }
  }

}
