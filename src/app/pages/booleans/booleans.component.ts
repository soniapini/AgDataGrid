import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { BooleanCellRendererComponent, MatColor, BoolEditor } from 'se-ui-datagrid';
import { DataRestClientService } from '../../services/data-rest-client.service';
@Component({
  selector: 'app-booleans',
  templateUrl: './booleans.component.html',
  styleUrls: ['./booleans.component.scss']
})
export class BooleansComponent implements OnInit, OnDestroy {
  public title = 'Booleans Grid';
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

    this.frameworkComponents = {
      booleanCellRenderer: BooleanCellRendererComponent
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
      width: 90,
      minWidth: 90,
      resizable: true,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter'
    };

    this.columnDefs = [
      {
        headerName: 'patient',
        field: 'patient',
        editable: false
      },
      {
        headerName: 'checkbox',
        field: 'checkbox',
        width: 50,
        cellRendererFramework: this.frameworkComponents.booleanCellRenderer,
        cellRendererParams: () => {
          return {
              disabled: false,
              color: MatColor.WARN,
              editor: BoolEditor.CHECKBOX
          };
        },
        editable: false
      },
      {
        headerName: 'slider',
        field: 'slider',
        cellRendererFramework: this.frameworkComponents.booleanCellRenderer,
        cellRendererParams: () => {
          return {
              disabled: false,
              color: MatColor.ACCENT,
              editor: BoolEditor.SLIDETOGGLE
          };
        },
        editable: false
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

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.restClient.getBooleansGridData()
      .subscribe((data) => this.rowData = data);
    // this.gridApi.resetRowHeights();
    this.gridApi.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    params.api.resetRowHeights();
    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();
  }
}
