import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HeaderComponent } from './dashboard-layout/header/header.component';
import { MenuItemComponent } from './dashboard-layout/menu-item/menu-item.component';
import { TripsComponent } from './trips/trips.component';
import { LocationComponent } from './location/location.component';
import { DialogLocationComponent } from './location/location-table/dialog-location/dialog-location.component';
import { SnackBarComponent } from './common/snack-bar/snack-bar.component';
import { LorryComponent } from './lorry/lorry.component';
import { AssignDriverComponent } from './lorry/assign-driver/assign-driver.component';
import { DialogLorryComponent } from './lorry/lorry-table/dialog-lorry/dialog-lorry.component';
import { LorryTableComponent } from './lorry/lorry-table/lorry-table.component';
import { DriverTableComponent } from './driver/driver-table/driver-table.component';
import { DialogDriverComponent } from './driver/driver-table/dialog-driver/dialog-driver.component';
import { DriverComponent } from './driver/driver.component';
import { LocationTableComponent } from './location/location-table/location-table.component';
import { DriverDetailsComponent } from './driver/driver-details/driver-details.component';
import { DriverFormComponent } from './driver/driver-form/driver-form.component';
import { ProfileComponent } from './driver/driver-form/profile/profile.component';
import { PersonalInformationComponent } from './driver/driver-form/personal-information/personal-information.component';
import { EmergencyContactComponent } from './driver/driver-form/emergency-contact/emergency-contact.component';
import { FamilyComponent } from './driver/driver-form/family/family.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    HeaderComponent,
    MenuItemComponent,
    TripsComponent,
    LocationComponent,
    DialogLocationComponent,
    SnackBarComponent,
    LorryComponent,
    AssignDriverComponent,
    DialogLorryComponent,
    LorryTableComponent,
    DriverTableComponent,
    DialogDriverComponent,
    DriverComponent,
    LocationTableComponent,
    DriverDetailsComponent,
    DriverFormComponent,
    ProfileComponent,
    PersonalInformationComponent,
    EmergencyContactComponent,
    FamilyComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatCardModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
