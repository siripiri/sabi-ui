import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DriverDetailsComponent } from './driver/driver-details/driver-details.component';
import { DriverComponent } from './driver/driver.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoadsComponent } from './loads/loads.component';
import { LocationComponent } from './location/location.component';
import { LorryComponent } from './lorry/lorry.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'location',
        component: LocationComponent
      },
      {
        path: 'lorry',
        component: LorryComponent
      },
      {
        path: 'driver',
        component: DriverComponent
      },
      {
        path: 'driver/:id',
        component: DriverDetailsComponent
      },
      {
        path: 'loads',
        component: LoadsComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      },
      {
        path: 'trip',
        component: TripsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
