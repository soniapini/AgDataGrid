import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BaseGridComponent } from './pages/base-grid/base-grid.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ResponsiveGridComponent } from './pages/responsive-grid/responsive-grid.component';
import { HideColsComponent } from './pages/hide-cols/hide-cols.component';
import { RowResizeComponent } from './pages/row-resize/row-resize.component';
import { DateTimeGridComponent } from './pages/date-time-grid/date-time-grid.component';
import { BooleansComponent } from './pages/booleans/booleans.component';
import { ComboGridComponent } from './pages/combo-grid/combo-grid.component';
import { from } from 'rxjs';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
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
  {
    path: 'resize',
    component: RowResizeComponent,
  },
  {
    path: 'date-time',
    component: DateTimeGridComponent,
  },
  {
    path: 'booleans',
    component: BooleansComponent,
  },
  {
    path: 'combo',
    component: ComboGridComponent,
  },
  {path: '**', component: PageNotFoundComponent}
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
export class AppRoutingModule {
}
