import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridEvent, GridOptions } from 'ag-grid-community';
import { ColDef, ColGroupDef } from 'ag-grid-community/dist/lib/entities/colDef';
import { NumericCellEditor } from './editors/numeric-cell-editor';
import { MatRadioChange } from '@angular/material/radio';
import { NumericCellEditorComponent } from './components/numeric-cell-editor/numeric-cell-editor.component';
import { CustomDateCellComponent } from './components/custom-date-cell/custom-date-cell.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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

  isDark: boolean = false;

  constructor(private httpClient: HttpClient) {

    this.components = {
      numericCellEditor: NumericCellEditor
    };

    this.frameworkComponents = {
      numericCellEditor: NumericCellEditorComponent,
      customDateCell: CustomDateCellComponent
    };

    this.gridOptions = {
      headerHeight: 20,
      pagination: true,
      paginationAutoPageSize: true,
      rowHeight: 40,
      onGridReady: this.onGridReady,
      frameworkComponents: this.frameworkComponents
    };

    this.editType = null;

    this.defaultColumnDef = {
      width: 90,
      minWidth: 90,
      resizable: true,
      editable: (params) => this.isGridEditable,
      filter: 'agTextColumnFilter',


      // cellEditorSelector: (params) => {
      //   if (params.colDef.type === 'numberColumn') {
      //     return { component: 'numericCellEditor',
      //     params: {
      //       maxLength: 2
      //     }};
      //   }
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
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: {
          min: 0,
          max: 100
        },
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: {
          min: 1900,
          max: 2020
        },
        width: 100
      },
      {
        headerName: 'Date',
        field: 'date',
        type: ['dateColumn', 'nonEditableColumn'],
        width: 120,
        cellRenderer: 'customDateCell',
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

  onGridReady = (params: AgGridEvent) => {
    console.log('ricevuto evento: ', params.type);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.httpClient.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json')
      .subscribe((data) => this.rowData = data);

  };

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

  onChangeDarkThemeToggle(ob: MatSlideToggleChange) {
    this.isDark = ob.checked;
  }
}
