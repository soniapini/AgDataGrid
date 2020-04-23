import { AfterViewInit, Component, Input } from '@angular/core';
import { AlphanumericCellEditorBaseComponent } from '../alphanumeric-cell-editor-base/alphanumeric-cell-editor-base.component';

@Component({
  selector: 'se-alphanumeric-cell-editor-inline',
  templateUrl: './alphanumeric-cell-editor-inline.component.html',
  styleUrls: ['./alphanumeric-cell-editor-inline.component.scss']
})
export class AlphanumericCellEditorInlineComponent extends AlphanumericCellEditorBaseComponent implements AfterViewInit {

  @Input() startEdited: boolean;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.startEdited) {
      window.setTimeout(() => {
        this.alphanumericInput.nativeElement.focus();
        this.alphanumericInput.nativeElement.select();
        this.formReady.emit(this.formControl);
      }, 0);
    }
  }

}
