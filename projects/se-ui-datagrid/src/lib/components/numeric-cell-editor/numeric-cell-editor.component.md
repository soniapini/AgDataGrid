# NumericCellEditor Component

Riportiamo di seguito un esempio di utilizzo dell'editor in una cella di AgGrid.

Il passaggio dei parametri ai Componenti che implementano ICellEditorAngularComp avviene utilizzando la proprietà di
AgGrid ```cellEditorParams```.

La colonna 'age' passa i parametri min e max in modo dinamico utilizzando una funzione.
La colonna 'year' passa i parametri min e max in modo statico utilizzando un oggetto.

```typescript
 columnDefs: Array<(ColDef | ColGroupDef)>;
 frameworkComponents: any;
 minAgeConstraint: number;
 maxAgeConstraint: number;
 ...

 this.frameworkComponents = {
       numericCellEditor: NumericCellEditorComponent,
      ...
     };

 this.columnDefs = [
      ...
      {
        headerName: 'Age',
        field: 'age',
        type: 'numberColumn',
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: () => {
          return {
            min: this.minAgeConstraint,
            max: this.maxAgeConstraint
          };
        },
      },
      {
        headerName: 'Year',
        field: 'year',
        type: 'numberColumn',
        width: 100,
        cellEditorFramework: this.frameworkComponents.numericCellEditor,
        cellEditorParams: {
          min: 1900,
          max: 2020
        },
      ...
    ]
```

