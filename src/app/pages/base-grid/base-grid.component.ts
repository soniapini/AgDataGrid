import { CellCoordsData } from './../../models/grid-models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { NumericCellEditor } from '../../editors/numeric-cell-editor';

import { CustomCellComponent, LetterCellEditorComponent, NumericCellEditorComponent } from 'se-ui-datagrid';

@Component({
  selector: 'app-base-grid',
  templateUrl: './base-grid.component.html',
  styleUrls: ['./base-grid.component.scss']
})
export class BaseGridComponent implements OnInit, OnDestroy {
  private darkThemeEventSubscription: Subscription;
  private stopEditingEventSubscription: Subscription;
  private editTypeSubscription: Subscription;
  private startEditingSubscription: Subscription;

  public isDark: boolean = false;
  public editType: string = null;
  public cellCoords: CellCoordsData;

  private gridApi;
  private gridColumnApi;

  public gridOptions: GridOptions;
  public columnDefs: Array<(ColDef | ColGroupDef)>;
  public defaultColumnDef: ColDef;
  public components: any;
  public frameworkComponents: any;
  public rowData: any = [];
  public isGridEditable = true;


  constructor(
    private httpClient: HttpClient,
    public gridCommonServices: GridCommonService
  ) {
  }

  ngOnInit(): void {
    this.darkThemeEventSubscription = this.gridCommonServices.getCustomDarkTheme().subscribe(isDark => this.isDark = isDark);
    this.editTypeSubscription = this.gridCommonServices.getEditType().subscribe(editType => this.editType = editType);
    this.stopEditingEventSubscription = this.gridCommonServices.getStopEditing().subscribe(stopEditing => {
      if (stopEditing === true) {
        this.gridApi.stopEditing();
        this.gridCommonServices.setStopEditing(false);
      }
    });
    this.startEditingSubscription = this.gridCommonServices.getEditCell().subscribe(cellCoords => {
      if (cellCoords) {
        this.gridApi.setFocusedCell(cellCoords.row, cellCoords.col);
        this.gridApi.startEditingCell({
          rowIndex: cellCoords.row,
          colKey: cellCoords.col,
        });
      }
    });

    this.components = {
      numericCellEditor: NumericCellEditor
    };

    this.frameworkComponents = {
      numericCellEditor: NumericCellEditorComponent,
      letterCellEditor: LetterCellEditorComponent,
      customCell: CustomCellComponent
    };

    this.gridOptions = {
      headerHeight: 20,
      pagination: true,
      paginationAutoPageSize: true,
      rowHeight: 40,
      onGridReady: this.onGridReady,
      onGridSizeChanged: this.onGridSizeChanged,
      frameworkComponents: this.frameworkComponents,
    };

    this.defaultColumnDef = {
      width: 90,
      minWidth: 90,
      resizable: true,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter',

      // cellEditorSelector: (params) => {
      //   if (params.colDef.type === 'numberColumn') {
      //     return { component: 'numericCellEditor',
      //     params: {
      //       maxLength: 2
      //     }};
      //   }
      //
      //   if (params.colDef.type === 'gender') {
      //     return {
      //       component: 'agRichSelect',
      //       params: {values: ['Male', 'Female']}
      //     };
      //   }
      //   return null;
      // }
    };

    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        width: 150,
        pinned: 'left',
        editable: false,
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 150,
        cellEditorFramework: this.frameworkComponents.letterCellEditor,
        cellEditorParams: {},
      },
      {
        headerName: 'Age',
        field: 'age',
        type: 'numberColumn',
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: {
          min: 0,
          max: 100
        },
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: {
          min: 1900,
          max: 2020
        },
        width: 100
      },
      {
        headerName: 'Date',
        field: 'date',
        type: ['dateColumn', 'nonEditableColumn'],
        width: 120,
      },
      {
        headerName: 'Medals',
        headerClass: 'medal--background',
        groupId: 'medalsGroup',
        children: [
          {
            headerName: 'Gold',
            field: 'gold',
            type: 'medalColumn',
            cellRenderer: 'customCell',
          },
          {
            headerName: 'Silver',
            field: 'silver',
            type: 'medalColumn',
            cellRenderer: 'customCell',
          },
          {
            headerName: 'Bronze',
            field: 'bronze',
            type: 'medalColumn',
            width: 100,
            cellRenderer: 'customCell',
          },
        ],
      },
    ];

  }

  ngOnDestroy() {
    if (this.darkThemeEventSubscription) {
      this.darkThemeEventSubscription.unsubscribe();
    }
    if (this.editTypeSubscription) {
      this.editTypeSubscription.unsubscribe();
    }
    if (this.stopEditingEventSubscription) {
      this.stopEditingEventSubscription.unsubscribe();
    }
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.httpClient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json')
      .subscribe((data) => this.rowData = data);
    this.gridApi.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    const gridWidth = document.getElementById('base-grid').offsetWidth;
    const columnsToShow = [];
    const columnsToHide = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getAllColumns();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    this.gridColumnApi.setColumnsVisible(columnsToShow, true);
    this.gridColumnApi.setColumnsVisible(columnsToHide, false);
    this.gridApi.sizeColumnsToFit();
  }

}
