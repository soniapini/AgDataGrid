import { AfterViewInit, Component, Input } from '@angular/core';
import { LetterCellEditorBaseComponent } from '../letter-cell-editor-base/letter-cell-editor-base.component';

@Component({
  selector: 'lib-letter-cell-editor-inline',
  templateUrl: './letter-cell-editor-inline.component.html',
  styleUrls: ['./letter-cell-editor-inline.component.scss']
})
export class LetterCellEditorInlineComponent extends LetterCellEditorBaseComponent implements AfterViewInit {

  @Input() startEdited: boolean;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.startEdited) {
      window.setTimeout(() => {
        this.letterInput.nativeElement.focus();
        this.formReady.emit(this.formControl);
      }, 0);
    }
  }

}
