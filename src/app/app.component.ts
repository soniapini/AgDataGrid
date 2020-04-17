import { Component, ViewEncapsulation } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GridCommonService } from './services/grid-common.service';
import { CellCoordsData } from './models/grid-models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  title = 'ag-Grid test project';
  sidenavOpened: boolean = true;
  isGridEditable = true;
  isCellEditorEnabled = true;
  isDark = false;


  private gridApi;

  constructor(public gridCommonServices: GridCommonService) { }

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
  }

  onchangeEditorType(event: MatRadioChange) {
    if (event.value === 'fullRow') {
      this.gridCommonServices.setEditType('fullRow');
      this.isCellEditorEnabled = false;
    } else {
      this.gridCommonServices.setEditType(null);
      this.isCellEditorEnabled = true;
    }
    this.gridCommonServices.setStopEditing(true);
  }
}
