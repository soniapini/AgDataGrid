import { AfterViewInit, Component, Input, ViewEncapsulation } from '@angular/core';
import { NumericCellEditorBaseComponent } from '../numeric-cell-editor-base/numeric-cell-editor-base.component';

@Component({
  selector: 'lib-numeric-cell-editor-inline',
  templateUrl: './numeric-cell-editor-inline.component.html',
  styleUrls: ['./numeric-cell-editor-inline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumericCellEditorInlineComponent extends NumericCellEditorBaseComponent implements AfterViewInit {

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
