import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssignDriverComponent } from '../assign-driver/assign-driver.component';
import { DialogLorryComponent } from './dialog-lorry/dialog-lorry.component';
import { Lorry, LorryTable } from '../lorry.model';
import { LorryService } from '../lorry.service';

@Component({
  selector: 'app-lorry-table',
  templateUrl: './lorry-table.component.html',
  styleUrls: ['./lorry-table.component.css']
})
export class LorryTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'numberPlate', 'type', 'modelNumber', 'manufacturer', 'driverName', 'action'];
  dataSource!: MatTableDataSource<LorryTable>;
  sizeOfLorry: number = 0;

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
    this.lorryService.getLorryTable()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sizeOfLorry = result.length;
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createLorry() {
    let dialogRef = this.__dialog.open(
      DialogLorryComponent, {
      height: '440px',
      width: '390px',
      data: { update: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.id) {
        this.openSnackBar(`Added new Lorry (${result?.numberPlate})`, "Dismiss");
        this.ngOnInit();
      }
    });
  }

  updateLorry(lorry: LorryTable) {
    let dialogRef = this.__dialog.open(
      DialogLorryComponent, {
      height: '440px',
      width: '390px',
      data: { update: true, lorry: lorry }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.id) {
        this.openSnackBar(`Updated Lorry (${result?.numberPlate})`, "Dismiss");
        this.ngOnInit();
      }
    });
  }

  deleteLorry() {

  }

  assignDriver(lorry: Lorry) {
    if(lorry.driverName == 'Not Assigned') {
      let dialogRef = this.__dialog.open(
        AssignDriverComponent, {
          height: '270px',
          width: '390px',
          data: { lorry: lorry }
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if(result?.id) {
            this.openSnackBar(`the driver(${result.driverName}) is assigned to lorry(${result.numberPlate})`, 'Dismiss');
            this.ngOnInit();
          }
        });
        return;
    }

    if(confirm(`Are you sure to unassign driver(${lorry.driverName}) in lorry(${lorry.numberPlate})`)){
      this.lorryService.unassignDriver(lorry).subscribe(
        (result: Lorry) => {
          if(result != null && result.driverId == null){
            this.openSnackBar(`Sucessfully unassigned driver in lorry (${result.numberPlate})`, 'Dismiss');
            this.ngOnInit();
          }
        }, (err) => {
          console.log(err);
        }
      )
    }

  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }
}
