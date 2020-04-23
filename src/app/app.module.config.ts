import { InjectionToken } from '@angular/core';

export interface DemoAppConfig {
  getDataRestBaseUrl(): string;

  getDataRestMockExtension(): string;
}

export let APP_CONFIG = new InjectionToken<DemoAppConfig>('demoApp.config');
