
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import {
  AlphanumericCellEditorComponent,
  DateCellEditorComponent,
  DateCellRendererComponent,
  DateFormatEnum,
  DateInputEnum
} from 'se-ui-datagrid';
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
          this.gridApi.forEachDetailGridInfo(function(detailGridApi) {
            detailGridApi.api.stopEditing();
          });
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
      alphanumericCellEditor: AlphanumericCellEditorComponent,
      dateTimeCellEditor: DateCellEditorComponent,
      dateTimeCellRender: DateCellRendererComponent
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
      minWidth: 50,
      resizable: true,
      flex: 1,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter'
    };

    this.columnDefs = [
      {
        headerName: 'User Name',
        field: 'user',
        pinned: 'left',
        editable: false,
        cellRenderer: 'agGroupCellRenderer',
        width: 100,
      },
      {
        headerName: 'Email',
        field: 'email'
      },
      {
        headerName: 'Department',
        field: 'department',
      },
      {
        headerName: 'Hiring Year',
        field: 'hiringYear',
        width: 60,
      },
      {
        headerName: 'Note',
        field: 'note',
        width: 200,
        cellEditorFramework: this.frameworkComponents.alphanumericCellEditor,
        cellEditorParams: () => {
          return {
            notAdmissibleChars: ['a', 'b', 'w'],
            inlineEditor: !this.isPopupEditor
          };
        }
      }
    ];

    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          {
            field: 'ipv4',
            minWidth: 150,
            cellEditorFramework: this.frameworkComponents.alphanumericCellEditor,
            cellEditorParams: () => {
              return {
                notAdmissibleChars: ['a', 'b', 'w'],
                inlineEditor: !this.isPopupEditor
              };
            }
          },
          {
            field: 'ipv6',
            minWidth: 150,
            cellEditorFramework: this.frameworkComponents.alphanumericCellEditor,
            cellEditorParams: () => {
              return {
                notAdmissibleChars: ['a', 'b', 'w'],
                inlineEditor: !this.isPopupEditor
              };
            }
          },
          {
            field: 'login',
            type: 'dateTimeColumn',
            cellEditorFramework: this.frameworkComponents.dateTimeCellEditor,
            cellEditorParams: () => {
              return {
                inputType: DateInputEnum.DATE_TIME,
                inputFormat: DateFormatEnum.SHORT,
                inlineEditor: !this.isPopupEditor
              };
            },
            cellRendererFramework: this.frameworkComponents.dateTimeCellRender,
            cellRendererParams: () => {
              return {
                inputType: DateInputEnum.DATE_TIME,
                inputFormat: DateFormatEnum.SHORT,
              };
            }
          }
        ],
        defaultColDef: {
          flex: 1,
          editable: (params) => this.isGridEditable,
        },
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
      // espande l'accordion della riga passata come paramentro
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

  onGridSizeChanged(params) {
    params.api.resetRowHeights();
    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();
  }

}

