import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SeErrorStateMatcher } from '../../../utils/error-state-matcher';

/**
 * Base component for numeric-cell-editor.
 * It contains common functionalities used by NumericCellEditorInlineComponent
 * and NumericCellEditorPopupComponent
 */
@Component({
  template: ''
})
export class NumericCellEditorBaseComponent implements OnInit {

  @Input() value: number;

  @Input() min: number;

  @Input() max: number;

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

}
