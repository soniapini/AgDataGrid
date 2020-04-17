import { Injectable } from '@angular/core';
import { Observable, of as observableOf, ReplaySubject, BehaviorSubject } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CellCoordsData } from '../models/grid-models';

@Injectable({
  providedIn: 'root'
})

export class GridCommonService {
  private isDarkStream: ReplaySubject<boolean | undefined> = new ReplaySubject(undefined);
  private isDark$: Observable<boolean | false> = this.isDarkStream.asObservable();

  private editTypeStream: ReplaySubject<string | null> = new ReplaySubject(null);
  private editType$: Observable<string | null> = this.editTypeStream.asObservable();

  private stopEditingStream: BehaviorSubject<boolean | undefined> = new BehaviorSubject(false);
  private stopEditing$: Observable<boolean | false> = this.stopEditingStream.asObservable();

  private editCellStream: BehaviorSubject<CellCoordsData | undefined> = new BehaviorSubject(undefined);
  private editCell$: Observable<CellCoordsData | undefined> = this.editCellStream.asObservable();

  constructor() { }

  public setCustomDarkTheme(cheched: boolean) {
    this.isDarkStream.next(cheched);
  }

  public getCustomDarkTheme(): Observable<boolean | false> {
    return this.isDark$;
  }

  public setEditType(editType: string) {
    this.editTypeStream.next(editType);
  }

  public getEditType(): Observable<string | null> {
    return this.editType$;
  }

  public setStopEditing(stopEditing: boolean) {
    this.stopEditingStream.next(stopEditing);
  }

  public getStopEditing(): Observable<boolean | false> {
    return this.stopEditing$;
  }

  public setEditCell(cellCoords: CellCoordsData) {
    this.editCellStream.next(cellCoords);
    console.log('cell coords: ', this.editCell$);
  }

  public getEditCell(): Observable<CellCoordsData | undefined> {
    return this.editCell$;
  }

}
