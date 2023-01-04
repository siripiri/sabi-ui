import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DriverFormComponent } from '../driver-form/driver-form.component';
import { DriverTable, DriverForm } from '../driver.model';
import { DriverService } from '../driver.service';
import { DialogDriverComponent } from './dialog-driver/dialog-driver.component';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.css']
})
export class DriverTableComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'gender', 'age', 'address', 'phoneNumber1', 'phoneNumber2', 'lorry', 'action'];
  dataSource!: MatTableDataSource<DriverTable>;
  sizeOfDriver:number = 0;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private driverService:DriverService,
    private __dialog: MatDialog,
    private __snackBar: MatSnackBar,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.driverService.getDriverTable()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sizeOfDriver = result.length;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createDriver() {
    let dialogRef = this.__dialog.open(
      DriverFormComponent, {
        height: 'auto',
        width: '790px',
        data: {update: false}
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.profile?.id) {
        console.log(result);
        this.openSnackBar(`Added new Driver - ${result.profile.driverName}`, 'Dismiss');
        this.ngOnInit();
      }
    })
  }

  updateDriver(driverTable: DriverTable) {
    this.driverService.getDriverById(driverTable.id)
      .subscribe((result: DriverForm) => {
        let dialogRef = this.__dialog.open(
          DialogDriverComponent, {
            height: '640px',
            width: '390px',
            data: {update: true, driver: result}
          });
        
          dialogRef.afterClosed().subscribe(result => {
            if(result?.id) {
              this.openSnackBar(`Updated Driver - ${result.driverName}`, 'Dismiss');
              this.ngOnInit();
            }
          });
      });
  }

  deleteDriver(driverTable: DriverTable) {

  }

  openDriver(driverTable: DriverTable) {
    this.route.navigate([`/driver/${driverTable.id}`]);
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}
