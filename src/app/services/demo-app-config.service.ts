import { DemoAppConfig } from '../app.module.config';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoAppConfigService implements DemoAppConfig {

  constructor() {
  }

  getDataRestBaseUrl(): string {
    // Per usare il server del pacchetto json-server
    // return 'http://localhost:3000'

    // Per usare i file mock presenti nella cartella assets
    return 'assets/mocks';
  }

  getDataRestMockExtension(): string {
    // Per usare il server del pacchetto json-server
    // return null

    // Per usare i file mock presenti nella cartella assets
    return '.json';
  }
}
