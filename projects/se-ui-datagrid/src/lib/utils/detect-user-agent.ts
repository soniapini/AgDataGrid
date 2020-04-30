import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetectUserAgent {

  private userAgent;

  constructor() {
    this.userAgent = window.navigator.userAgent;
  }

  public isIE(): boolean {
    return this.userAgent.indexOf('MSIE ') !== -1 ||
      this.userAgent.indexOf('Trident/') !== -1;
  }

  public isFF(): boolean {
    return this.userAgent.indexOf('Firefox') !== -1;
  }

  public isChrome(): boolean {
    return this.userAgent.indexOf('Chrome') > -1;
  }

  public isSafari(): boolean {
    return this.userAgent.indexOf('Safari') !== -1 &&
      !this.isChrome();
  }
}
