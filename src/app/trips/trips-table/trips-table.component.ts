import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { tripsTable } from '../trips.model';
import { TripsService } from '../trips.service';
import { DialogTripsComponent } from './dialog-trips/dialog-trips.component';

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css']
})
export class TripsTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'distributorName', 'city', 'kmAllocated', 'kmCovered', 'timeTaken', 'driverName', 'lorryNumberPlate', 'action'];
  dataSource!: MatTableDataSource<tripsTable>;
  sizeOfTrips: number = 0;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private __dialog: MatDialog,
    private __snackBar: MatSnackBar,
    private tripService: TripsService 
  ) { }

  ngOnInit(): void {
    this.tripService.getAllTripTables()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sizeOfTrips = result.length;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createTrip() {
    let dialogRef = this.__dialog.open(
      DialogTripsComponent, {
        height: "630px",
        width: "700px"
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if(result?.id) {
          this.openSnackBar(`Added new Trip (${result?.id})`, 'Dismiss');
          this.ngOnInit();
        }
      });
  }

  updateTrip(tripsTable: tripsTable) {

  }

  deleteTrip() {

  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }
}
