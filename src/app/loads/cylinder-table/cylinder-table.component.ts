import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoadServiceService } from '../load-service.service';
import { cylinder } from '../loads-model';

@Component({
  selector: 'app-cylinder-table',
  templateUrl: './cylinder-table.component.html',
  styleUrls: ['./cylinder-table.component.css']
})
export class CylinderTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'description', 'action'];
  dataSource!: MatTableDataSource<cylinder>;
  sizeOfCylinder: number = 0;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private __dialog: MatDialog,
    private __snackBar: MatSnackBar,
    private loadService: LoadServiceService
  ) { }

  ngOnInit(): void {
    this.loadService.getAllCylinder()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sizeOfCylinder = result.length;
      })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createCylinder() {}

  updateCylinder(row: any) {}

  deleteCylinder() {}


  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}
