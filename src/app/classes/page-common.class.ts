import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridCommonService } from '../services/grid-common.service';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import {
  AlphanumericCellEditorComponent,
  ColumnConstraintTooltipComponent,
  LetterCellEditorComponent,
  NumericCellEditorComponent
} from 'se-ui-datagrid';
import { DataRestClientService } from '../services/data-rest-client.service';

export class PageCommonClass implements OnInit, OnDestroy{

  public editType: string;
  public isPopupEditor: boolean;
  public gridOptions: GridOptions;
  public columnDefs: Array<(ColDef | ColGroupDef)>;
  public defaultColumnDef: ColDef;
  public components: any;
  public frameworkComponents: any = {};
  public rowData: any = [];
  public isGridEditable = true;
  public isSingleClickEditing = true;

  public darkThemeEventSubscription: Subscription;
  public stopEditingEventSubscription: Subscription;
  public editTypeSubscription: Subscription;
  public startEditingSubscription: Subscription;
  public gridEditableSubscription: Subscription;
  public popupEditorSubscription: Subscription;
  public singleClickEditingSubscription: Subscription;
  public gridApi;
  public gridColumnApi;

  minAgeConstraint: number = 0;
  maxAgeConstraint: number = 99;

  constructor(
    public restClient: DataRestClientService,
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

    this.singleClickEditingSubscription = this.gridCommonServices.getSingleClickEditing()
      .subscribe(isSingleClickEditing => {
        this.isSingleClickEditing = isSingleClickEditing;
        if (this.gridOptions) {
          this.gridOptions.singleClickEdit = this.isSingleClickEditing;
        }
      });

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
    if (this.singleClickEditingSubscription) {
      this.singleClickEditingSubscription.unsubscribe();
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
    // this.restClient.getBaseGridData()
    //   .subscribe((data) => this.rowData = data);
    // // this.gridApi.resetRowHeights();
    this.gridApi.sizeColumnsToFit();
  }
}
