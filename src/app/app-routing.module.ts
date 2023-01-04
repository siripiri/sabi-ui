import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { DriverDetailsComponent } from './driver/driver-details/driver-details.component';
import { DriverFormComponent } from './driver/driver-form/driver-form.component';
import { DriverComponent } from './driver/driver.component';
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
        component: DriverComponent,
        children: [
          {
            path: ':id',
            component: DriverDetailsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
