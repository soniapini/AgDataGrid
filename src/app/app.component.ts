import { Component, ViewEncapsulation } from '@angular/core';

import { MatRadioChange } from '@angular/material/radio';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { GridCommonService } from './services/grid-common.service';

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


  constructor(public gridCommonServices: GridCommonService) {
  }

  onBtStartEditing() {
    this.gridApi.setFocusedCell(2, 'sport');
    this.gridApi.startEditingCell({
      rowIndex: 2,
      colKey: 'sport',
    });
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  onChangeDarkThemeToggle(ob: MatSlideToggleChange) {
    this.gridCommonServices.isDark = ob.checked;
  }

  onChangeEditorToggle(ob: MatSlideToggleChange) {
    this.isCellEditorEnabled =  ob.checked;
    this.isGridEditable = ob.checked;
    this.gridApi.stopEditing();
  }

  onchangeEditorType(event: MatRadioChange) {
    if (event.value === 'fullRow') {
      this.gridCommonServices.editType = 'fullRow';
      this.isCellEditorEnabled = false;
    } else {
      this.gridCommonServices.editType = null;
      this.isCellEditorEnabled = true;
    }
    this.gridApi.stopEditing();
  }
}
