import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { LorryTable } from './lorry.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LorryService } from './lorry.service';
import { DialogLorryComponent } from './dialog-lorry/dialog-lorry.component';

@Component({
  selector: 'app-lorry',
  templateUrl: './lorry.component.html',
  styleUrls: ['./lorry.component.css']
})
export class LorryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'numberPlate', 'type', 'modelNumber', 'manufacturer', 'driverName', 'action'];
  dataSource!: MatTableDataSource<LorryTable>;
  sizeOfLorry:number = 0;

  @ViewChild(MatSort)
  sort!:MatSort;

  @ViewChild(MatPaginator)
  paginator!:MatPaginator;

  constructor(
    private lorryService: LorryService,
    private __dialog:MatDialog,
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

  createLorry(){
    let dialogRef = this.__dialog.open(
      DialogLorryComponent, {
        height: '500px',
        width: '390px'
      }
    );
  }

  updateLorry(lorry: LorryTable) {

  }

  deleteLorry() {

  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration:5000 });
  }


}
