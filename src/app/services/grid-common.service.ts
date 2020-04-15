import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridCommonService {
  isDark: boolean = false;
  editType: string = null;

  constructor() { }
}
