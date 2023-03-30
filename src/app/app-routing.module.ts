import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
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
    path:'',
    redirectTo: 'signIn',
    pathMatch:'full'
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'location',
        component: LocationComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'lorry',
        component: LorryComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'driver',
        component: DriverComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'driver/:id',
        component: DriverDetailsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'loads',
        component: LoadsComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'trip',
        component: TripsComponent,
        canActivate: [AuthGuardGuard]
      }
    ]
  },
  {
    path:'**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
