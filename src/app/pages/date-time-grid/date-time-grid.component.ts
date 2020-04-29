import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { Subscription } from 'rxjs';
import { DataRestClientService } from '../../services/data-rest-client.service';
import { GridCommonService } from '../../services/grid-common.service';
import { DateCellEditorComponent, DateCellRendererComponent, DateFormatEnum, DateInputEnum } from 'se-ui-datagrid';
import { DateTimeGridDataModel } from '../../models/date-time.grid-data-model';

@Component({
  selector: 'app-date-time-grid',
  templateUrl: './date-time-grid.component.html',
  styleUrls: ['./date-time-grid.component.scss']
})
export class DateTimeGridComponent implements OnInit, OnDestroy {

  public title = 'DateTime Grid';
  public editType: string;
  public isPopupEditor: boolean;
  public gridOptions: GridOptions;
  public columnDefs: Array<(ColDef | ColGroupDef)>;
  public defaultColumnDef: ColDef;
  public components: any;
  public frameworkComponents: any;
  public rowData: Array<DateTimeGridDataModel> = [];
  public isGridEditable = true;
  private darkThemeEventSubscription: Subscription;
  private stopEditingEventSubscription: Subscription;
  private editTypeSubscription: Subscription;
  private startEditingSubscription: Subscription;
  private gridEditableSubscription: Subscription;
  private popupEditorSubscription: Subscription;
  private gridApi;
  private gridColumnApi;

  constructor(private restClient: DataRestClientService,
              public gridCommonServices: GridCommonService) {
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
      dateTimeCellEditor: DateCellEditorComponent,
      dateTimeCellRender: DateCellRendererComponent
    };

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

    this.columnDefs = [
      {
        headerName: 'Patient',
        field: 'patient',
        width: 120,
        pinned: 'left',
        editable: false,
      },
      {
        headerName: 'Admission',
        field: 'admission',
        type: 'dateTimeColumn',
        width: 150,
        // valueFormatter: (params) => {
        //   return DatePipe.transform(params.value, 'dd/MM/YYYY');
        // },
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
      },
      {
        headerName: 'Date',
        field: 'date',
        type: 'dateColumn',
        width: 90,
        cellEditorFramework: this.frameworkComponents.dateTimeCellEditor,
        cellEditorParams: () => {
          return {
            inlineEditor: !this.isPopupEditor,
            inputType: DateInputEnum.DATE,
            inputFormat: DateFormatEnum.LONG
          };
        },
        cellRendererFramework: this.frameworkComponents.dateTimeCellRender,
        cellRendererParams: () => {
          return {
            inputType: DateInputEnum.DATE,
            inputFormat: DateFormatEnum.LONG
          };
        }
      },
      {
        headerName: 'Time',
        field: 'time',
        type: 'timeColumn',
        width: 90,
        cellEditorFramework: this.frameworkComponents.dateTimeCellEditor,
        cellEditorParams: () => {
          return {
            inlineEditor: !this.isPopupEditor,
            inputType: DateInputEnum.TIME,
            inputFormat: DateFormatEnum.LONG
          };
        },
        cellRendererFramework: this.frameworkComponents.dateTimeCellRender,
        cellRendererParams: () => {
          return {
            inputType: DateInputEnum.TIME,
            inputFormat: DateFormatEnum.LONG
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
    this.restClient.getDateTimeGridData()
      .subscribe((data) => this.rowData = data);
    // this.gridApi.resetRowHeights();
    this.gridApi.sizeColumnsToFit();
  };

}
