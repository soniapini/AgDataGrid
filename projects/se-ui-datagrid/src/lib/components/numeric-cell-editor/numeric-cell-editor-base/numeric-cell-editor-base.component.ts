import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SeErrorStateMatcher } from '../../../utils/error-state-matcher';

/**
 * Base Editor Custom AgGrid for Numeric Input.
 * It contains common functionalities used by NumericCellEditorInlineComponent
 * and NumericCellEditorPopupComponent
 */
@Component({
  template: ''
})
export class NumericCellEditorBaseComponent implements OnInit {

  /**
   * Current value of the cell
   * ngModel setted by NumericCellEditorComponent
   */
  @Input() value: number;

  /**
   * (Optional) it allows to specify the minimum admissible value
   * passed by NumericCellEditorComponent
   */
  @Input() min: number;

  /**
   * (Optional) it allows to specify the maximum admissible value
   * passed by NumericCellEditorComponent
   */
  @Input() max: number;

  /**
   * (Optional) it allows to specify the number of decimals
   * passed by NumericCellEditorComponent
   */
  @Input() decimal: number;

  /**
   * Event emitted when the reactive form is ready
   */
  @Output() formReady: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  @ViewChild('numericInput', {static: false, read: ElementRef}) numericInput: ElementRef;

  formControl: FormControl;
  matcher = new SeErrorStateMatcher();
  step: string;

  numericFormatStr: string;
  numericFormatRegExp: RegExp;

  constructor() {
  }

  ngOnInit(): void {
    // Definizione FormControl
    const validators: Array<ValidatorFn> = [];

    this.formControl = new FormControl(this.value, []);

    // validators.push(Validators.required); // TODO serve gestire il validatore required?

    if (this.max) {
      validators.push(Validators.max(this.max));
    }
    if (this.min !== null && this.min !== undefined) {
      validators.push(Validators.min(this.min));
    }
    this.formControl.setValidators(validators);

    this.buildNumericFormat();
  }

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    console.log(this.numericInput.nativeElement.value);
    const current: string = this.numericInput.nativeElement.value;
    return this.numericFormatRegExp.test(current.concat(event.key));
  }

  //
  // @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
  //   this.validateFields(event);
  // }

  private buildNumericFormat() {
    if (!this.decimal) {
      this.numericFormatStr = '^[-+]?[0-9]+$';
      this.step = '1';
    } else {
      this.numericFormatStr = '^[-+]?[0-9]+(\.)?[0-9]{0,' + this.decimal + '}$';
      this.step = '0.'.concat('0'.repeat(this.decimal - 1).concat('1'));
    }
    this.numericFormatRegExp = new RegExp(this.numericFormatStr);
  }
}
