import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SeErrorStateMatcher } from '../../../utils/error-state-matcher';

@Component({
  template: '',
})
export class LetterCellEditorBaseComponent implements OnInit {
  @Input() value: string;

  @Output() formReady: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  @ViewChild('letterInput', {static: false, read: ElementRef}) letterInput: ElementRef;

  formControl: FormControl;
  matcher = new SeErrorStateMatcher();

  constructor() {
  }

  ngOnInit(): void {
    const LETTER_REGEXP = /^[a-zA-Z ]*$/;
    // Definizione FormControl
    const validators: Array<ValidatorFn> = [];

    this.formControl = new FormControl(this.value, []);

    validators.push(Validators.required);
    validators.push(Validators.pattern(LETTER_REGEXP));

    this.formControl.setValidators(validators);
  }

}
