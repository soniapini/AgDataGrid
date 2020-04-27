import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, DemoAppConfig } from '../app.module.config';

@Injectable({
  providedIn: 'root'
})
export class DataRestClientService {

  private baseUrl: string;
  private mockExtension: string;

  constructor(@Inject(APP_CONFIG) config: DemoAppConfig,
              private httpClient: HttpClient) {
    this.baseUrl = config.getDataRestBaseUrl();
    this.mockExtension = config.getDataRestMockExtension();
  }

  getBaseGridData(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/baseGrid${this.mockExtension}`);
  }

  getDateTimeGridData() {
    return this.httpClient.get(`${this.baseUrl}/dateTimeGrid${this.mockExtension}`);
  }
}
