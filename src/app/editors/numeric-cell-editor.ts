import {IAfterGuiAttachedParams, ICellEditorComp, ICellEditorParams} from 'ag-grid-community';

export class NumericCellEditor implements ICellEditorComp {
  private eInput: HTMLInputElement;
  private cancelBeforeStart: boolean;
  private cancelAfterEnd: boolean;

  init(params: ICellEditorParams): void {
    this.eInput = document.createElement('input');
    if (this.isCharNumeric(params.charPress)) {
      this.eInput.value = params.charPress;
    } else {
      if (params.value !== undefined && params.value !== null) {
        this.eInput.value = params.value;
      }
    }

    this.eInput.addEventListener('keypress', (event) => {
      if (!this.isKeyPressedNumeric(event)) {
        this.eInput.focus();
        if (event.preventDefault) {
          event.preventDefault();
        }
      } else if (this.isKeyPressedNavigation(event)) {
        event.stopPropagation();
      }
    });

    // only start edit if key pressed is a number, not a letter
    const charPressIsNotANumber = params.charPress && ('1234567890'.indexOf(params.charPress) < 0);
    this.cancelBeforeStart = charPressIsNotANumber;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
    // lasciando il focus nell'editor di intera riga si posiziona il focus sulla cella con editor custom
     this.eInput.focus();
  }

  destroy(): void {
  }

  focusIn(): void {

  }

  focusOut(): void {

  }

  getFrameworkComponentInstance(): any {
  }

  getGui(): HTMLElement {
    return this.eInput;
  }

  getValue(): any {
    return this.eInput.value;
  }

  private isCharNumeric(charStr) {
    return !!/\d/.test(charStr);
  }

  private getCharCodeFromEvent(event: KeyboardEvent) {
    return (typeof event.which === 'undefined') ? event.code : event.which;
  }

  private isKeyPressedNumeric(event: KeyboardEvent) {
    const charCode = this.getCharCodeFromEvent(event);
    let charStr = null;
    if (typeof charCode === 'number') {
      charStr = String.fromCharCode(charCode);
    }
    return this.isCharNumeric(charStr);
  }

  private isKeyPressedNavigation(event) {
    return event.code === 39
      || event.code === 37
      || event.keyCode === 39
      || event.keyCode === 37;

  }


  isCancelAfterEnd(): boolean {
    // return this.cancelAfterEnd;

    // example - will reject the number if it contains the value 007
    // - not very practical, but demonstrates the method.
    const value = this.getValue();
    return value.indexOf('007') >= 0;
  }

  isCancelBeforeStart(): boolean {
    return this.cancelBeforeStart;
  }

  isPopup(): boolean {
    return false;
  }


}
