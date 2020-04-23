import { AfterViewInit, Component, Input } from '@angular/core';
import { LetterCellEditorBaseComponent } from '../../letter-cell-editor/letter-cell-editor-base/letter-cell-editor-base.component';

@Component({
  selector: 'se-alphanumeric-cell-editor-popup',
  templateUrl: './alphanumeric-cell-editor-popup.component.html',
  styleUrls: ['./alphanumeric-cell-editor-popup.component.scss']
})
export class AlphanumericCellEditorPopupComponent extends LetterCellEditorBaseComponent implements AfterViewInit {

  @Input() width: string;

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.letterInput.nativeElement.focus();
      this.formReady.emit(this.formControl);
    }, 0);
  }

}
