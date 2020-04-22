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
  isDark: boolean;


  private gridApi;

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
    this.gridCommonServices.setCustomDarkTheme(toggleOb.checked);
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
    } else {
      this.gridCommonServices.setEditType(null);
      this.isCellEditorEnabled = true;
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
    this.isDark = false;
    this.gridCommonServices.setCustomDarkTheme(this.isDark);
  }
}
