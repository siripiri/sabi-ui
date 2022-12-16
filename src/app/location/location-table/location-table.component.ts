import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogLocationComponent } from '../dialog-location/dialog-location.component';
import { LocationTable } from '../location.model';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'distributorName', 'address', 'city', 'state', 'kmAllocated', 'action'];
  dataSource!: MatTableDataSource<LocationTable>;
  sizeOfLocation: number = 0;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private locationService: LocationService,
    private __dialog: MatDialog,
    private __snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.locationService.getLocationDataTable()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sizeOfLocation = result.length;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createLocation() {
    let dialogRef = this.__dialog.open(
      DialogLocationComponent, {
      height: '540px',
      width: '400px',
      data: { update: false }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.id) {
        this.openSnackBar("Added new location successfully", "Dismiss");
        this.ngOnInit();
      }
    });
  }

  updateLocation(locationTable: LocationTable) {
    let dialogRef = this.__dialog.open(
      DialogLocationComponent, {
      height: '540px',
      width: '400px',
      data: { update: true, locationTable: locationTable }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result?.id) {
        this.openSnackBar("Updated location successfully", "Dismiss");
        this.ngOnInit();
      }
    })
  }

  deleteLocation(locationTable: LocationTable) {

  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}
