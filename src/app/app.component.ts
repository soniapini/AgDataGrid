import { Component, ViewEncapsulation } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GridCommonService } from './services/grid-common.service';
import { CellCoordsData } from './models/grid-models';
import { DemoConstants } from './demo-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'ag-Grid test project';
  sidenavOpened: boolean;
  isGridEditable: boolean;
  isCellEditorEnabled: boolean;
  isSingleClickEditing: boolean;
  isDark: boolean;


  private gridApi;
  isPopUp: boolean;

  constructor(private gridCommonServices: GridCommonService) {
    this.initialiseDemoAppConfiguration();
  }

  onBtStartEditing() {
    const cellCoords = new CellCoordsData();
    cellCoords.row = 2;
    cellCoords.col = 'sport';
    this.gridCommonServices.setEditCell(cellCoords);
  }

  onBtStopEditing() {
    this.gridCommonServices.setStopEditing(true);
  }

  onChangeDarkThemeToggle(toggleOb: MatSlideToggleChange) {
    // this.gridCommonServices.setCustomDarkTheme(toggleOb.checked);
    document.getElementById('body').classList.add(toggleOb.checked ? 'estensa-dark' : 'estensa-light');
    document.getElementById('body').classList.remove(toggleOb.checked ? 'estensa-light' :  'estensa-dark');
    this.isDark = toggleOb.checked;
  }

  onChangeEditorToggle(ob: MatSlideToggleChange) {
    this.isCellEditorEnabled =  ob.checked;
    this.isGridEditable = ob.checked;
    this.gridCommonServices.setStopEditing(true);
    this.gridCommonServices.setGridEditable(ob.checked);
  }

  onchangeEditorType(event: MatRadioChange) {
    if (event.value === DemoConstants.GRID_EDITOR_TYPE) {
      this.gridCommonServices.setEditType(DemoConstants.GRID_EDITOR_TYPE);
      this.isCellEditorEnabled = false;
      this.isPopUp = false;
      this.gridCommonServices.setPopupEditor(this.isPopUp);
    } else {
      this.gridCommonServices.setEditType(null);
      this.isCellEditorEnabled = true;
    }
    this.gridCommonServices.setStopEditing(true);
  }

  onChangeClickType(event: MatSlideToggleChange) {
    if (event.checked === true) {
      this.gridCommonServices.setSingleClickEditing(true);
      this.isSingleClickEditing = true;
    } else {
      this.gridCommonServices.setSingleClickEditing(false);
      this.isSingleClickEditing = false;
    }
    this.gridCommonServices.setStopEditing(true);
  }

  private initialiseDemoAppConfiguration() {
    // gestione navbar laterale
    this.sidenavOpened = false;

    // gestione griglia editabile: SI/NO
    this.isGridEditable = true;
    this.gridCommonServices.setGridEditable(this.isGridEditable);

    // gestione editor fullRow/cell
    this.isCellEditorEnabled = true;
    this.gridCommonServices.setEditType(this.isCellEditorEnabled ? null : DemoConstants.GRID_EDITOR_TYPE);

    // gestione tema light/dark
    this.isDark = true;
    document.getElementById('body').classList.add('estensa-dark');
    // this.gridCommonServices.setCustomDarkTheme(this.isDark);

    this.isPopUp = false;
    this.gridCommonServices.setPopupEditor(this.isPopUp);
  }

  enablePopupEditing(toggleOb: MatSlideToggleChange) {
    this.isPopUp = toggleOb.checked;
    this.gridCommonServices.setPopupEditor(this.isPopUp);
    this.gridCommonServices.setStopEditing(true);
  }
}
