import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent } from 'ag-grid-community';
import { BooleanCellRendererComponent, MatColor, BoolEditor } from 'se-ui-datagrid';
import { DataRestClientService } from '../../services/data-rest-client.service';
import { PageCommonClass } from '../../classes/page-common.class';

@Component({
  selector: 'app-boolean-grid',
  templateUrl: './boolean-grid.component.html',
  styleUrls: ['./boolean-grid.component.scss']
})
export class BooleanGridComponent extends PageCommonClass implements OnInit, OnDestroy {
  public title = 'Booleans Grid';

  constructor(
    public restClient: DataRestClientService,
    public gridCommonServices: GridCommonService
  ) {
    super(restClient, gridCommonServices);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.frameworkComponents = {
      booleanCellRenderer: BooleanCellRendererComponent
    };

    this.gridOptions.onGridSizeChanged = this.onGridSizeChanged;

    this.columnDefs = [
      {
        headerName: 'patient',
        field: 'patient',
      },
      {
        headerName: 'checkbox',
        field: 'checkbox',
        width: 50,
        cellRendererFramework: this.frameworkComponents.booleanCellRenderer,
        cellRendererParams: () => {
          return {
              disabled: !this.isGridEditable,
              color: MatColor.WARN,
              editor: BoolEditor.CHECKBOX
          };
        },
      },
      {
        headerName: 'slider',
        field: 'slider',
        cellRendererFramework: this.frameworkComponents.booleanCellRenderer,
        cellRendererParams: () => {
          return {
              disabled: !this.isGridEditable,
              color: MatColor.ACCENT,
              editor: BoolEditor.SLIDETOGGLE
          };
        },
      }
    ];
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);

    // tslint:disable-next-line:no-unused-expression
    super.onGridReady;
    this.gridApi = params.api;

    this.restClient.getBooleansGridData()
      .subscribe((data) => this.rowData = data);
    this.gridApi.sizeColumnsToFit();
  }

  onGridSizeChanged(params) {
    params.api.resetRowHeights();
    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();
  }
}
