import { AfterViewInit, Component, Input } from '@angular/core';
import { LetterCellEditorBaseComponent } from '../letter-cell-editor-base/letter-cell-editor-base.component';

@Component({
  selector: 'se-letter-cell-editor-popup',
  templateUrl: './letter-cell-editor-popup.component.html',
  styleUrls: ['./letter-cell-editor-popup.component.scss']
})
export class LetterCellEditorPopupComponent extends LetterCellEditorBaseComponent implements AfterViewInit {

  @Input() width: string;

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.letterInput.nativeElement.focus();
      this.formReady.emit(this.formControl);
    }, 0);
  }

}
