import { AfterViewInit, Component, Input } from '@angular/core';
import { NumericCellEditorBaseComponent } from '../numeric-cell-editor-base/numeric-cell-editor-base.component';

@Component({
  selector: 'lib-numeric-cell-editor-popup',
  templateUrl: './numeric-cell-editor-popup.component.html',
  styleUrls: ['./numeric-cell-editor-popup.component.scss']
})
export class NumericCellEditorPopupComponent extends NumericCellEditorBaseComponent implements AfterViewInit {

  @Input() width: string;

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.numericInput.nativeElement.focus();
      this.formReady.emit(this.formControl);
    }, 0);
  }

}
