import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { CustomCellComponent, LetterCellEditorComponent, NumericCellEditorComponent } from 'se-ui-datagrid';
import { DataRestClientService } from '../../services/data-rest-client.service';

@Component({
  selector: 'app-responsive-grid',
  templateUrl: './responsive-grid.component.html',
  styleUrls: ['./responsive-grid.component.scss']
})
export class ResponsiveGridComponent implements OnInit, OnDestroy {
  public title = 'Responsive Grid';
  public isDark: boolean;
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
            min: 0,
            max: 100,
            decimal: 2
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
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.restClient.getBaseGridData()
      .subscribe((data) => this.rowData = data);
    this.gridApi.resetRowHeights();
    this.gridApi.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    params.api.resetRowHeights();
    params.api.sizeColumnsToFit();
  }

}
