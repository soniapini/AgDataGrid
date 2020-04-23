import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SeErrorStateMatcher } from '../../../utils/error-state-matcher';

@Component({
  template: ''
})
export class AlphanumericCellEditorBaseComponent implements OnInit {
  @Input() value: string;

  @Input() notAdmissibleChars: Array<string>;

  @Output() formReady: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  @ViewChild('alphanumericInput', {static: false, read: ElementRef}) alphanumericInput: ElementRef;

  notAdmissibleCharsString: string;

  allAdmissibleCharsString: string;
  allAdmissibleCharsRegexp: RegExp;

  formControl: FormControl;
  matcher = new SeErrorStateMatcher();

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return this.allAdmissibleCharsRegexp.test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.configPatternForAvailableChars();

    const validators: Array<ValidatorFn> = [];

    this.formControl = new FormControl(this.value, []);

    validators.push(Validators.pattern(this.allAdmissibleCharsRegexp));

    this.formControl.setValidators(validators);
  }

  private configPatternForAvailableChars() {
    // regExp for not admissible chars
    if (this.notAdmissibleChars) {
      this.notAdmissibleCharsString = '(?![' + this.notAdmissibleChars.join('') + '])';
      this.allAdmissibleCharsRegexp = new RegExp(this.allAdmissibleCharsString);
    }
  }

  private validateFields(event) {
    setTimeout(() => {
      let notAdmissibleRegExp: RegExp;
      if (this.notAdmissibleChars) {
        notAdmissibleRegExp = new RegExp('[' + this.notAdmissibleChars.join() + ']', 'g');
      }
      this.alphanumericInput.nativeElement.value = this.alphanumericInput.nativeElement.value
        .replace(notAdmissibleRegExp, '')
        .replace(/\s/g, '');

      event.preventDefault();
    }, 100);
  }
}
