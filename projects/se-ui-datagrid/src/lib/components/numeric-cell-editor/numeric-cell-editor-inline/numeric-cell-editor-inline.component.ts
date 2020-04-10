import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SeErrorStateMatcher } from '../../../utils/error-state-matcher';

@Component({
  selector: 'lib-numeric-cell-editor-inline',
  templateUrl: './numeric-cell-editor-inline.component.html',
  styleUrls: ['./numeric-cell-editor-inline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NumericCellEditorInlineComponent implements OnInit, AfterViewInit {

  @Input() value: number;

  @Input() min: number;

  @Input() max: number;

  @Input() width: string;

  @Output() formReady: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  @ViewChild('numericInput', {static: false, read: ElementRef}) numericInput: ElementRef;

  formControl: FormControl;
  matcher = new SeErrorStateMatcher();

  constructor() {
  }

  ngOnInit(): void {
    // Definizione FormControl
    const validators: Array<ValidatorFn> = [];

    this.formControl = new FormControl(this.value, []);

    validators.push(Validators.required);

    if (this.max) {
      validators.push(Validators.max(this.max));
    }
    if (this.min !== null && this.min !== undefined) {
      validators.push(Validators.min(this.min));
    }

    this.formControl.setValidators(validators);

  }

  ngAfterViewInit(): void {
    window.setTimeout(() => {
      this.numericInput.nativeElement.focus();
      this.formReady.emit(this.formControl);
    }, 0);
  }

}
