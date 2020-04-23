import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-se-ui-datagrid',
  template: `
    <p>
      se-ui-datagrid works!
    </p>
  `,
  styleUrls: ['./se-ui-datagrid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SeUiDatagridComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
