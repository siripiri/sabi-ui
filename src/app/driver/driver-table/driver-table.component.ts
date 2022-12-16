import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Driver, DriverTable } from '../../lorry/lorry.model';
import { LorryService } from '../../lorry/lorry.service';
import { DialogDriverComponent } from './dialog-driver/dialog-driver.component';

@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.css']
})
export class DriverTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'address', 'childrenDetails', 'lorry', 'action'];
  dataSource!: MatTableDataSource<DriverTable>;
  sizeOfDriver:number = 0;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private lorryService: LorryService,
    private __dialog: MatDialog,
    private __snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.lorryService.getDriverTable()
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
      DialogDriverComponent, {
        height: '640px',
        width: '390px',
        data: {update: false}
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.id) {
        this.openSnackBar(`Added new Driver - ${result.driverName}`, 'Dismiss');
        this.ngOnInit();
      }
    })
  }

  updateDriver(driverTable: DriverTable) {
    this.lorryService.getDriverById(driverTable.id)
      .subscribe((result: Driver) => {
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

  deleteDriver() {}

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}
