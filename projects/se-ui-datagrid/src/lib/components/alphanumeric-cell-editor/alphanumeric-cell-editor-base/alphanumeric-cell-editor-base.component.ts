import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  notAdmissibleCharsRegexp: RegExp;

  formControl: FormControl;
  matcher = new SeErrorStateMatcher();

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    if (this.notAdmissibleCharsRegexp) {
      return !this.notAdmissibleCharsRegexp.test(event.key);
    }
    return true;
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.configPatternForAvailableChars();
    this.formControl = new FormControl(this.value, []);
  }

  private configPatternForAvailableChars() {
    // regExp for not admissible chars
    if (this.notAdmissibleChars) {
      this.notAdmissibleCharsString = '[' + this.notAdmissibleChars.join('') + ']';
      this.notAdmissibleCharsRegexp = new RegExp(this.notAdmissibleCharsString);
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
