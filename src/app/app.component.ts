import {Component, ViewEncapsulation} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AgGridEvent, ColumnApi, GridOptions} from 'ag-grid-community';
import {ColDef, ColGroupDef} from 'ag-grid-community/dist/lib/entities/colDef';
import {NumericCellEditor} from './editors/numeric-cell-editor';
import {MatRadioChange} from '@angular/material/radio';
import {NumericCellEditorComponent} from './components/numeric-cell-editor/numeric-cell-editor.component';
import {MatInputModule} from '@angular/material/input';

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
  frameworkComponents: any;

  rowData: any = [];

  isGridEditable = true;
  editType: string;
  isCellEditorEnabled = true;

  constructor(private httpClient: HttpClient) {

    this.components = {
      numericCellEditor: NumericCellEditor
    };

    this.frameworkComponents = {
      numericCellEditor: NumericCellEditorComponent,
      inputCellEditor: MatInputModule
    };

    this.gridOptions = {
      headerHeight: 20,
      pagination: true,
      paginationAutoPageSize: true,
      rowHeight: 40,
    };

    this.editType = null;

    this.defaultColumnDef = {
      width: 90,
      minWidth: 90,
      resizable: true,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter',

      // cellEditorSelector: (params) => {
      //   // if (params.colDef.type === 'numberColumn') {
      //   //   return { component: this.frameworkComponents.numericCellEditor};
      //   // }
      //
      //   if (params.colDef.type === 'gender') {
      //     return {
      //       component: 'agRichSelect',
      //       params: {values: ['Male', 'Female']}
      //     };
      //   }
      //   return null;
      // }
    };

    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        width: 150,
        pinned: 'left',
        editable: false,
      },
      {
        headerName: 'Sport',
        field: 'sport',
        width: 150
      },
      {
        headerName: 'Age',
        field: 'age',
        type: 'numberColumn',
        cellEditorFramework: this.frameworkComponents.numericCellEditor
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
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


  }

  onGridReady(params: AgGridEvent) {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.httpClient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json')
      .subscribe((data) => this.rowData = data);

  }

  changeEditableProperty(event: MatRadioChange) {
    if (event.value === '1') {
      this.isGridEditable = true;
      this.isCellEditorEnabled = true;
    } else {
      this.isGridEditable = false;
    }
  }

  onBtStartEditing() {
    this.gridApi.setFocusedCell(2, 'athlete');
    this.gridApi.startEditingCell({
      rowIndex: 2,
      colKey: 'athlete',
    });
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  onBtnAbilitaFullRowEditor() {
    this.editType = 'fullRow';
    this.isCellEditorEnabled = false;
  }
}
