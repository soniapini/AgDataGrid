import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { SeErrorStateMatcher } from '../../../utils/error-state-matcher';

@Component({
  template: '',
})
export class LetterCellEditorBaseComponent implements OnInit {
  @Input() value: string;

  @Input() notAdmissibleChars: Array<string>;

  @Output() formReady: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  @ViewChild('letterInput', {static: false, read: ElementRef}) letterInput: ElementRef;

  // This editor acepts only letters no special char
  LETTERS_REGEXP = /^[a-zA-Z ]*$/;
  LETTER_STR = '[a-zA-Z ]';

  // Every char other than a-zA-z and blank  chars different
  NOT_LETTER_REGEXP = /[^A-Za-z ]/g;

  notAdmissibleCharsString: string;

  allAdmissibleCharsString: string;
  allAdmissibleCharsRegexp: RegExp;

  formControl: FormControl;
  matcher = new SeErrorStateMatcher();

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return this.allAdmissibleCharsRegexp.test(event.key);
  }

  // @HostListener('keydown', ['$event']) preventKeybordNavigation(event) {
  //   const KEY_LEFT = 'ArrowLeft';
  //   const KEY_UP = 'ArrowUp';
  //   const KEY_RIGHT = 'ArrowRight';
  //   const KEY_DOWN = 'ArrowDown';
  //   const KEY_PAGE_UP = 'PageUp';
  //   const KEY_PAGE_DOWN = 'PageDown';
  //   const KEY_PAGE_HOME = 'Home';
  //   const KEY_PAGE_END = 'End';
  //
  //   const pressedKey = event.key;
  //   const isNavigationKey = pressedKey === KEY_LEFT || pressedKey === KEY_RIGHT || pressedKey === KEY_UP
  //     || pressedKey === KEY_DOWN || pressedKey === KEY_PAGE_DOWN || pressedKey === KEY_PAGE_UP
  //     || pressedKey === KEY_PAGE_HOME || pressedKey === KEY_PAGE_END;
  //
  //   if (isNavigationKey) {
  //     event.stopPropagation();
  //   }
  // }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    this.validateFields(event);
  }

  constructor() {
  }

  ngOnInit(): void {
    this.configPatternForAvailableChars();

    // Definizione FormControl
    const validators: Array<ValidatorFn> = [];

    this.formControl = new FormControl(this.value, []);

    // validators.push(Validators.required); // TODO gestire validatore required?
    validators.push(Validators.pattern(this.allAdmissibleCharsRegexp));

    this.formControl.setValidators(validators);
  }

  private configPatternForAvailableChars() {
    // regExp for not admissible chars
    if (this.notAdmissibleChars) {
      this.notAdmissibleCharsString = '(?![' + this.notAdmissibleChars.join('') + '])';
      this.allAdmissibleCharsString = this.notAdmissibleCharsString + this.LETTER_STR;
      this.allAdmissibleCharsRegexp = new RegExp(this.allAdmissibleCharsString);
    } else {
      this.allAdmissibleCharsRegexp = this.LETTERS_REGEXP;
    }

  }

  private validateFields(event) {
    setTimeout(() => {
      this.letterInput.nativeElement.value = this.letterInput.nativeElement.value
        .replace(this.NOT_LETTER_REGEXP, '')
        .replace(/\s/g, '');

      let notAdmissibleRegExp: RegExp;
      if (this.notAdmissibleChars) {
        notAdmissibleRegExp = new RegExp('[' + this.notAdmissibleChars.join() + ']', 'g');
      }
      this.letterInput.nativeElement.value = this.letterInput.nativeElement.value
        .replace(notAdmissibleRegExp, '')
        .replace(/\s/g, '');

      event.preventDefault();
    }, 100);
  }

}
