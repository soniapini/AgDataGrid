import { AfterViewInit, Component, Input } from '@angular/core';
import { LetterCellEditorBaseComponent } from '../../letter-cell-editor/letter-cell-editor-base/letter-cell-editor-base.component';

@Component({
  selector: 'se-alphanumeric-cell-editor-inline',
  templateUrl: './alphanumeric-cell-editor-inline.component.html',
  styleUrls: ['./alphanumeric-cell-editor-inline.component.scss']
})
export class AlphanumericCellEditorInlineComponent extends LetterCellEditorBaseComponent implements AfterViewInit {

  @Input() startEdited: boolean;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    if (this.startEdited) {
      window.setTimeout(() => {
        this.letterInput.nativeElement.focus();
        this.letterInput.nativeElement.select();
        this.formReady.emit(this.formControl);
      }, 0);
    }
  }

}
