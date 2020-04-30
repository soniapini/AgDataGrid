
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
// import {} from 'se-ui-datagrid';
import { DataRestClientService } from '../../services/data-rest-client.service';

@Component({
  selector: 'app-master-detail-grid',
  templateUrl: './master-detail-grid.component.html',
  styleUrls: ['./master-detail-grid.component.scss']
})
export class MasterDetailGridComponent implements OnInit, OnDestroy {
  public title = 'Master/Detail Grid';
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

  public detailCellRendererParams;

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
      // numericCellEditor: NumericCellEditorComponent
    };

    this.gridOptions = {
      pagination: true,
      paginationAutoPageSize: true,
      onGridReady: this.onGridReady,
      masterDetail: true,
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
        headerName: 'User Name',
        field: 'user',
        width: 120,
        pinned: 'left',
        editable: false,
        cellRenderer: 'agGroupCellRenderer',
      },
      {
        headerName: 'Email',
        field: 'email',
        width: 150,
        // cellEditorFramework: this.frameworkComponents.letterCellEditor,
        // cellEditorParams: () => {
        //   return {
        //     notAdmissibleChars: ['a', 'b', 'w'],
        //     inlineEditor: !this.isPopupEditor
        //   };
        // },

      },
      {
        headerName: 'Department',
        field: 'department',
        width: 90
      },
      {
        headerName: 'Hiring Year',
        field: 'hiringYear',
        width: 90,
      },
      {
        headerName: 'Note',
        field: 'note',
        width: 120
      }
    ];

    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {
            field: 'ipv4',
            minWidth: 150,
          },
          {
            field: 'ipv6',
            minWidth: 150,
          },
          {
            field: 'login',
            type: 'dateColumn',
          }
        ],
        defaultColDef: { flex: 1 },
      },
      getDetailRowData: function (params) {
        params.successCallback(params.data.accessDetailGrid);
      },
    };
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

  onFirstDataRendered(params) {
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.restClient.getUsersGridData()
      .subscribe((data) => this.rowData = data);
    this.gridApi.sizeColumnsToFit();
  }
}

