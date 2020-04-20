import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  baseTableDemoDescription: string;
  constructor() { }

  ngOnInit(): void {
    this.baseTableDemoDescription = `Demo Base Table con primi editor custom. <br />
    Campo Sport: utilizza editor custom per soli caratteri alfabetici. <br />
    Campi Age e Year: utilizzano editor custom per soli caratteri numerici. `;

  }

}
