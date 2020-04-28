import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG, DemoAppConfig } from '../app.module.config';
import { DateTimeGridDataModel } from '../models/date-time.grid-data-model';

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

  getDateTimeGridData(): Observable<Array<DateTimeGridDataModel>> {
    return this.httpClient.get<Array<DateTimeGridDataModel>>(`${this.baseUrl}/dateTimeGrid${this.mockExtension}`);
  }

  getBooleansGridData() {
    return this.httpClient.get(`${this.baseUrl}/boolGrid${this.mockExtension}`);
  }
}
