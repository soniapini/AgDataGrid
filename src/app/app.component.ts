import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AgGridEvent, ColumnApi, GridOptions} from 'ag-grid-community';
import {ColDef, ColGroupDef} from 'ag-grid-community/dist/lib/entities/colDef';
import {NumericCellEditor} from './editors/numeric-cell-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ebitGrid';
  private gridApi;
  private gridColumnApi;

  gridOptions: GridOptions;
  columnDefs: Array<(ColDef | ColGroupDef)>;
  defaultColumnDef: ColDef;
  components: any;
  rowData: any = [];

  constructor(private httpClient: HttpClient) {

    this.gridOptions = {
      headerHeight: 20,
      pagination: true,
      paginationAutoPageSize: true,
      rowHeight: 40,
    };

    this.defaultColumnDef = {
      width: 90,
      minWidth: 90,
      resizable: true,
      editable: true,
      filter: 'agTextColumnFilter',
      cellEditorSelector: (params) => {
        if (params.colDef.type === 'numberColumn') {
          return { component: 'numericCellEditor' };
        }

        if (params.colDef.type === 'gender') {
          return {
            component: 'agRichSelect',
            params: { values: ['Male', 'Female'] }
          };
        }

        return null;
      }
    };

    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        width: 150,
        pinned: 'left'
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 150
      },
      {
        headerName: 'Age',
        field: 'age',
        type: 'numberColumn'
      },
      {
        headerName: 'Gender',
        field: 'gender',
        type: 'gender'
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
        width: 100
      },
      {
        headerName: 'Date',
        field: 'date',
        type: ['dateColumn', 'nonEditableColumn'],
        width: 120,
      },
      {
        headerName: 'Medals',
        headerClass: 'medal--background',
        groupId: 'medalsGroup',
        children: [
          {
            headerName: 'Gold',
            field: 'gold',
            type: 'medalColumn'
          },
          {
            headerName: 'Silver',
            field: 'silver',
            type: 'medalColumn'
          },
          {
            headerName: 'Bronze',
            field: 'bronze',
            type: 'medalColumn',
            width: 100
          },
        ],
      },
    ];

    this.components = {
      numericCellEditor: NumericCellEditor
    };
  }

  onGridReady(params: AgGridEvent) {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.httpClient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json')
      .subscribe((data) => this.rowData = data);

  }
}
