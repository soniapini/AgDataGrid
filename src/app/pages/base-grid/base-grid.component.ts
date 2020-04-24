import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { NumericCellEditor } from '../../editors/numeric-cell-editor';

import {
  AlphanumericCellEditorComponent,
  CustomCellComponent,
  LetterCellEditorComponent,
  NumericCellEditorComponent
} from 'se-ui-datagrid';
import { DataRestClientService } from '../../services/data-rest-client.service';

@Component({
  selector: 'app-base-grid',
  templateUrl: './base-grid.component.html',
  styleUrls: ['./base-grid.component.scss']
})
export class BaseGridComponent implements OnInit, OnDestroy {
  public title = 'Base Grid';
  public editType: string;
  public isPopupEditor: boolean;
  public gridOptions: GridOptions;
  public columnDefs: Array<(ColDef | ColGroupDef)>;
  public defaultColumnDef: ColDef;
  public components: any;
  public frameworkComponents: any;
  public rowData: any = [];
  public isGridEditable = true;
  private darkThemeEventSubscription: Subscription;
  private stopEditingEventSubscription: Subscription;
  private editTypeSubscription: Subscription;
  private startEditingSubscription: Subscription;
  private gridEditableSubscription: Subscription;
  private popupEditorSubscription: Subscription;
  private gridApi;
  private gridColumnApi;

  minAgeConstraint: number = 0;
  maxAgeConstraint: number = 99;

  constructor(
    private restClient: DataRestClientService,
    public gridCommonServices: GridCommonService
  ) {
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

    this.components = {
      numericCellEditor: NumericCellEditor
    };

    this.frameworkComponents = {
      numericCellEditor: NumericCellEditorComponent,
      letterCellEditor: LetterCellEditorComponent,
      alphanumericCellEditor: AlphanumericCellEditorComponent,
      customCell: CustomCellComponent
    };

    this.gridOptions = {
      // headerHeight: 20,
      pagination: true,
      paginationAutoPageSize: true,
      // rowHeight: 40,
      onGridReady: this.onGridReady,
      // onGridSizeChanged: this.onGridSizeChanged,
      frameworkComponents: this.frameworkComponents,
    };

    this.defaultColumnDef = {
      width: 90,
      minWidth: 90,
      resizable: true,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter'
    };

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
        }
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
        }
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
        }
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
        }
      }
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
    if (this.popupEditorSubscription) {
      this.popupEditorSubscription.unsubscribe();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (this.gridApi) {
      setTimeout(() => this.gridApi.sizeColumnsToFit());
    }
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.restClient.getBaseGridData()
      .subscribe((data) => this.rowData = data);
    // this.gridApi.resetRowHeights();
    this.gridApi.sizeColumnsToFit();
  };
}
