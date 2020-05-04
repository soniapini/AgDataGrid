import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';

import { AlphanumericCellEditorComponent, LetterCellEditorComponent, NumericCellEditorComponent } from 'se-ui-datagrid';
import { DataRestClientService } from '../../services/data-rest-client.service';
import { ColumnApi } from 'ag-grid-community/dist/lib/columnController/columnApi';

@Component({
  selector: 'app-hide-cols-grid',
  templateUrl: './hide-cols-grid.component.html',
  styleUrls: ['./hide-cols-grid.component.scss']
})
export class HideColsGridComponent implements OnInit, OnDestroy {
  public title = 'Hide Cols Grid';
  public editType: string;
  public isPopupEditor: boolean;
  public gridOptions: GridOptions;
  public columnDefs: Array<(ColDef | ColGroupDef)>;
  public defaultColumnDef: ColDef;
  public components: any;
  public frameworkComponents: any;
  public rowData: any = [];
  public isGridEditable = true;
  public sideBar: string;
  private darkThemeEventSubscription: Subscription;
  private stopEditingEventSubscription: Subscription;
  private editTypeSubscription: Subscription;
  private startEditingSubscription: Subscription;
  private gridEditableSubscription: Subscription;
  private popupEditorSubscription: Subscription;
  private gridApi;
  private gridColumnApi: ColumnApi;

  public internalColumnsDef: Array<any>;

  minAgeConstraint = 0;
  maxAgeConstraint = 99;

  constructor(
    private restClient: DataRestClientService,
    public gridCommonServices: GridCommonService
  ) {
    this.sideBar = 'columns';
    this.frameworkComponents = {
      numericCellEditor: NumericCellEditorComponent,
      letterCellEditor: LetterCellEditorComponent,
      alphanumericCellEditor: AlphanumericCellEditorComponent
    };

    this.internalColumnsDef = [
      {
        agCol: {
          headerName: 'Athlete',
          field: 'athlete',
          width: 120,
          pinned: 'left',
          editable: false,
        },
        visible: true
      },
      {
        agCol: {
          headerName: 'Sport',
          field: 'sport',
          width: 150
        },
        visible: true
      },
      {
        agCol: {
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
        },
        visible: true
      },
      {
        agCol: {
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
          }
        },
        visible: false
      },
      {
        agCol: {
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
          }
        },
        visible: true
      },
      {
        agCol: {
          headerName: 'Note',
          field: 'note',
          width: 120,
          cellEditorFramework: this.frameworkComponents.alphanumericCellEditor,
          cellEditorParams: () => {
            return {
              inlineEditor: !this.isPopupEditor,
              notAdmissibleChars: ['%', '&'],
            };
          }
        },
        visible: false
      }
    ];
    this.columnDefs = [];


  }

  ngOnInit(): void {

    this.editTypeSubscription = this.gridCommonServices.getEditType()
      .subscribe(editType => this.editType = editType);

    this.popupEditorSubscription = this.gridCommonServices.getPopupEditor()
      .subscribe(isPopup => this.isPopupEditor = isPopup);


    this.gridEditableSubscription = this.gridCommonServices.getGridEditable()
      .subscribe(isGridEditable => this.isGridEditable = isGridEditable);

    this.stopEditingEventSubscription = this.gridCommonServices.getStopEditing()
      .subscribe(stopEditing => {
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

    this.gridOptions = {
      pagination: true,
      paginationAutoPageSize: true,
      onGridReady: this.onGridReady,
      frameworkComponents: this.frameworkComponents,
    };

    this.defaultColumnDef = {
      width: 90,
      minWidth: 90,
      resizable: true,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter'
    };

    this.internalColumnsDef.forEach((colDef) => this.columnDefs.push(colDef.agCol));

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
    if (this.popupEditorSubscription) {
      this.popupEditorSubscription.unsubscribe();
    }
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.restClient.getBaseGridData()
      .subscribe((data) => this.rowData = data);
    this.setUpColumnsVisibility();

    this.gridApi.sizeColumnsToFit();
  };

  private setUpColumnsVisibility() {
    for (let index = 0; index < this.internalColumnsDef.length; index++) {
      this.gridColumnApi.setColumnVisible(this.internalColumnsDef[index].agCol.field, this.internalColumnsDef[index].visible);
      console.log(`Visibilità colonna ${this.internalColumnsDef[index].agCol.field}: ${this.internalColumnsDef[index].visible}`);
    }
  }

  updateColumnsVisibility(internalColIndex: number, isVisible: boolean) {
    this.gridColumnApi.setColumnVisible(this.internalColumnsDef[internalColIndex].agCol.field,
      isVisible);
    this.internalColumnsDef[internalColIndex].visible = isVisible;
    console.log(`Visibilità colonna ${this.internalColumnsDef[internalColIndex].agCol.field}: ${isVisible}`);
    this.gridApi.sizeColumnsToFit();

    console.log('---------- ', this.gridColumnApi.getColumn(this.internalColumnsDef[internalColIndex].agCol.field).isVisible());
  }


  onGridSizeChanged(params) {
    const gridWidth = document.getElementById('base-grid').offsetWidth;
    const columnsToShow = [];
    const columnsToHide = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getAllColumns();
    for (let i = 0; i < allColumns.length; i++) {
      const column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }
}
