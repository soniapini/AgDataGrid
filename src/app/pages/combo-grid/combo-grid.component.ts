import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridCommonService } from '../../services/grid-common.service';
import { AgGridEvent } from 'ag-grid-community';
import { DataRestClientService } from '../../services/data-rest-client.service';
import { PageCommonClass } from '../../classes/page-common.class';

@Component({
  selector: 'app-combo-grid',
  templateUrl: './combo-grid.component.html',
  styleUrls: ['./combo-grid.component.scss']
})
export class ComboGridComponent extends PageCommonClass implements OnInit, OnDestroy {
  public title = 'Combo Grid';

  constructor(
    public restClient: DataRestClientService,
    public gridCommonServices: GridCommonService
  ) {
    super(restClient, gridCommonServices);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.frameworkComponents = {
      // numericCellEditor: NumericCellEditorComponent
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
        // cellEditorFramework: this.frameworkComponents.letterCellEditor,
        // cellEditorParams: () => {
        //   return {
        //     notAdmissibleChars: ['a', 'b', 'w'],
        //     inlineEditor: !this.isPopupEditor
        //   };
        // },

      },
      {
        headerName: 'Age',
        field: 'age',
        type: 'numberColumn',
        width: 90
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
        width: 90,
      },
      {
        headerName: 'Score',
        field: 'points',
        type: 'numberColumn',
        width: 90
      },
      {
        headerName: 'Note',
        field: 'note',
        width: 120
      }
    ];
  }

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.restClient.getBaseGridData()
      .subscribe((data) => this.rowData = data);
    this.gridApi.sizeColumnsToFit();
  }
}
