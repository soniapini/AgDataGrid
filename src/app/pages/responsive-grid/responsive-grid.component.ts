import { Component, OnDestroy, OnInit } from '@angular/core';
import { CellCoordsData } from './../../models/grid-models';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { NumericCellEditor } from '../../editors/numeric-cell-editor';

import { CustomCellComponent, LetterCellEditorComponent, NumericCellEditorComponent } from 'se-ui-datagrid';

@Component({
  selector: 'app-responsive-grid',
  templateUrl: './responsive-grid.component.html',
  styleUrls: ['./responsive-grid.component.scss']
})
export class ResponsiveGridComponent implements OnInit, OnDestroy {
  public title = 'Responsive Grid';

  private darkThemeEventSubscription: Subscription;
  private stopEditingEventSubscription: Subscription;
  private editTypeSubscription: Subscription;
  private startEditingSubscription: Subscription;
  private gridEditableSubscription: Subscription;

  public isDark: boolean;
  public editType: string;
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
    this.darkThemeEventSubscription = this.gridCommonServices.getCustomDarkTheme()
      .subscribe(isDark => this.isDark = isDark);

    this.editTypeSubscription = this.gridCommonServices.getEditType()
      .subscribe(editType => this.editType = editType);

    this.gridEditableSubscription = this.gridCommonServices.getGridEditable()
      .subscribe(isGridEditable => this.isGridEditable = isGridEditable);

    this.stopEditingEventSubscription = this.gridCommonServices.getStopEditing()
      .subscribe(stopEditing => {
        if (stopEditing === true) {
          this.gridApi.stopEditing();
          this.gridCommonServices.setStopEditing(false);
        }
      });

    this.startEditingSubscription = this.gridCommonServices.getEditCell()
      .subscribe(cellCoords => {
        if (cellCoords && this.gridApi) {
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
      // headerHeight: 20,
      pagination: true,
      paginationAutoPageSize: true,
      // rowHeight: 40,
      onGridReady: this.onGridReady,
      onGridSizeChanged: this.onGridSizeChanged,
      frameworkComponents: this.frameworkComponents,
    };

    this.defaultColumnDef = {
      // width: 90,
      // minWidth: 90,
      resizable: true,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter',

    };

    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        // width: 300,
        pinned: 'left',
        editable: false,
      },
      {
        headerName: 'Sport',
        field: 'sport',
        // width: 150,
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
        // width: 100
      },
      {
        headerName: 'Date',
        field: 'date',
        type: ['dateColumn', 'nonEditableColumn'],
        // width: 120,
      },
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
        // width: 100,
        cellRenderer: 'customCell',
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
    if (this.gridEditableSubscription) {
      this.gridEditableSubscription.unsubscribe();
    }
    if (this.stopEditingEventSubscription) {
      this.gridCommonServices.stopCurrentEditing();
      this.stopEditingEventSubscription.unsubscribe();
    }
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.httpClient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json')
      .subscribe((data) => this.rowData = data);
    this.gridApi.resetRowHeights();
    this.gridApi.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    params.api.sizeColumnsToFit();
  }

}
