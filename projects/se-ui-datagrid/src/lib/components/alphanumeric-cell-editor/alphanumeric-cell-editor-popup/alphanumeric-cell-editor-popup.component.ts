import { AfterViewInit, Component, Input } from '@angular/core';
import { AlphanumericCellEditorBaseComponent } from '../alphanumeric-cell-editor-base/alphanumeric-cell-editor-base.component';

@Component({
  selector: 'se-alphanumeric-cell-editor-popup',
  templateUrl: './alphanumeric-cell-editor-popup.component.html',
  styleUrls: ['./alphanumeric-cell-editor-popup.component.scss']
})
export class AlphanumericCellEditorPopupComponent extends AlphanumericCellEditorBaseComponent implements AfterViewInit {

  @Input() width: string;

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.alphanumericInput.nativeElement.focus();
      this.formReady.emit(this.formControl);
    }, 0);
  }

}
