import { Component, HostListener, OnDestroy, OnInit, Injector } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';

import {
  AlphanumericCellEditorComponent,
  ColumnConstraintTooltipComponent,
  LetterCellEditorComponent,
  NumericCellEditorComponent
} from 'se-ui-datagrid';
import { DataRestClientService } from '../../services/data-rest-client.service';
import { PageCommonClass } from '../../classes/page-common.class';

@Component({
  selector: 'app-base-grid',
  templateUrl: './base-grid.component.html',
  styleUrls: ['./base-grid.component.scss']
})
export class BaseGridComponent extends PageCommonClass implements OnInit, OnDestroy {
  public title = 'Base Grid';

  minAgeConstraint: number = 0;
  maxAgeConstraint: number = 99;

  constructor(
    public restClient: DataRestClientService,
    public gridCommonServices: GridCommonService
    ) {
      super(restClient, gridCommonServices);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        width: 120,
        pinned: 'left',
        editable: false,
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 150,
        cellEditorFramework: this.frameworkComponents.letterCellEditor,
        cellEditorParams: () => {
          return {
            notAdmissibleChars: ['a', 'b', 'w'],
            inlineEditor: !this.isPopupEditor
          };
        },
        headerTooltip: 'Column constraint',
        tooltipComponent: 'notAdmissibleCharsTooltip',
        tooltipComponentParams: {cellType: 'not_numeric', notAdmissibleChars: 'a, b, w'}
      },
      {
        headerName: 'Age',
        field: 'age',
        type: 'numberColumn',
        width: 90,
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: () => {
          return {
            inlineEditor: !this.isPopupEditor,
            min: this.minAgeConstraint,
            max: this.maxAgeConstraint,
          };
        },
        headerTooltip: 'Column constraint',
        tooltipComponent: 'notAdmissibleCharsTooltip',
        tooltipComponentParams: () => {
          return {cellType: 'numeric', min: this.minAgeConstraint, max: this.maxAgeConstraint};
        }
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
        width: 90,
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: () => {
          return {
            inlineEditor: !this.isPopupEditor,
            min: 1900,
            max: 2020
          };
        },
        headerTooltip: 'Column constraint',
        tooltipComponent: 'notAdmissibleCharsTooltip',
        tooltipComponentParams: {cellType: 'numeric', min: 1900, max: 2020}
      },
      {
        headerName: 'Score',
        field: 'points',
        type: 'numberColumn',
        width: 90,
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: () => {
          return {
            inlineEditor: !this.isPopupEditor,
            min: 0,
            max: 100,
            decimal: 2
          };
        },
        headerTooltip: 'Column constraint',
        tooltipComponent: 'notAdmissibleCharsTooltip',
        tooltipComponentParams: {cellType: 'numeric', min: 0, max: 100, decimal: 2}
      },
      {
        headerName: 'Note',
        field: 'note',
        width: 120,
        cellEditorFramework: this.frameworkComponents.alphanumericCellEditor,
        cellEditorParams: () => {
          return {
            inlineEditor: !this.isPopupEditor,
            notAdmissibleChars: ['%', '&'],
          };
        },
        headerTooltip: 'Column constraint',
        tooltipComponent: 'notAdmissibleCharsTooltip',
        tooltipComponentParams: {notAdmissibleChars: '% &'}

      }
    ];
  }

}
