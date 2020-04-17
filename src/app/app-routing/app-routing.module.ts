import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { BaseGridComponent } from '../pages/base-grid/base-grid.component';
import { ResponsiveGridComponent } from '../pages/responsive-grid/responsive-grid.component';
import { HideColsComponent } from '../pages/hide-cols/hide-cols.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'base',
    component: BaseGridComponent,
  },
  {
    path: 'responsive',
    component: ResponsiveGridComponent,
  },
  {
    path: 'hide',
    component: HideColsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
