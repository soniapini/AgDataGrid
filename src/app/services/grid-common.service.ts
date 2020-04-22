import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { CellCoordsData } from '../models/grid-models';

@Injectable({
  providedIn: 'root'
})

export class GridCommonService {
  private isDarkStream: ReplaySubject<boolean | undefined> = new ReplaySubject(1);
  private isDark$: Observable<boolean> = this.isDarkStream.asObservable();

  private isGridEditableStream: ReplaySubject<boolean | undefined> = new ReplaySubject(1);
  private isGridEditable$: Observable<boolean> = this.isGridEditableStream.asObservable();

  private popupEditorStream: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private popupEditor$: Observable<boolean> = this.popupEditorStream.asObservable();

  private editTypeStream: ReplaySubject<string> = new ReplaySubject(1);
  private editType$: Observable<string | null> = this.editTypeStream.asObservable();

  private stopEditingStream: BehaviorSubject<boolean | undefined> = new BehaviorSubject(false);
  private stopEditing$: Observable<boolean | false> = this.stopEditingStream.asObservable();

  private editCellStream: BehaviorSubject<CellCoordsData | undefined> = new BehaviorSubject(undefined);
  private editCell$: Observable<CellCoordsData | undefined> = this.editCellStream.asObservable();

  constructor() {
  }

  public setCustomDarkTheme(checked: boolean) {
    this.isDarkStream.next(checked);
  }

  public getCustomDarkTheme(): Observable<boolean> {
    return this.isDark$;
  }

  public setEditType(editType: string) {
    this.editTypeStream.next(editType);
  }

  public getEditType(): Observable<string> {
    return this.editType$;
  }

  public setPopupEditor(isPopup: boolean) {
    this.popupEditorStream.next(isPopup);
  }

  public getPopupEditor(): Observable<boolean> {
    return this.popupEditor$;
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

  public setGridEditable(isGridEditable: boolean) {
    this.isGridEditableStream.next(isGridEditable);
  }

  public getGridEditable(): Observable<boolean> {
    return this.isGridEditable$;
  }

  stopCurrentEditing() {
    this.setEditCell(undefined);
    this.setStopEditing(true);
  }
}
