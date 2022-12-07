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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HeaderComponent } from './dashboard-layout/header/header.component';
import { MenuItemComponent } from './dashboard-layout/menu-item/menu-item.component';
import { TripsComponent } from './trips/trips.component';
import { LocationComponent } from './location/location.component';
import { DialogLocationComponent } from './location/dialog-location/dialog-location.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { LorryComponent } from './lorry/lorry.component';
import { AssignDriverComponent } from './lorry/assign-driver/assign-driver.component';
import { DialogLorryComponent } from './lorry/dialog-lorry/dialog-lorry.component';

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
    DialogLorryComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
