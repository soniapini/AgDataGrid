import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SeErrorStateMatcher } from '../../../utils/error-state-matcher';
import { DateInputEnum } from '../../../models/date-input.enum';

/**
 * Base Editor Custom AgGrid for Date/DateTime/Time Input.
 * It contains common functionalities used by DateCellEditorInlineComponent
 * and DateCellEditorPopupComponent
 */
@Component({
  template: ''
})
export class DateCellEditorBaseComponent implements OnInit {
  /**
   * Current value of the cell
   * ngModel setted by DateCellEditorComponent
   */
  @Input() value: string;

  /**
   * Type of the input:
   * - datetime
   * - date
   * - time
   */
  @Input() inputType: DateInputEnum;

  /**
   * Event emitted when the reactive form is ready
   */
  @Output() formReady: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  @ViewChild('dateInput', {static: false, read: ElementRef}) dateInput: ElementRef;


  formControl: FormControl;
  matcher = new SeErrorStateMatcher();

  constructor() {
  }

  ngOnInit(): void {

    this.formControl = new FormControl(this.value, []);
  }

}
