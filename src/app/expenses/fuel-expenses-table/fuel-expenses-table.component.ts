import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuelExpenses, FuelExpensesTable } from '../expenses.model';
import { ExpensesService } from '../expenses.service';
import { DialogFuelExpensesComponent } from './dialog-fuel-expenses/dialog-fuel-expenses.component';

@Component({
  selector: 'app-fuel-expenses-table',
  templateUrl: './fuel-expenses-table.component.html',
  styleUrls: ['./fuel-expenses-table.component.css']
})
export class FuelExpensesTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'amount', 'date', 'notes', 'currentPrice', 'literFilled', 'paymentMode', 'action'];
  dataSource!: MatTableDataSource<FuelExpensesTable>;
  sizeOfFuelExpenses: number = 0;

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(
    private expenseService: ExpensesService,
    private __dialog: MatDialog,
    private __snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.expenseService.getAllFuelExpenses()
      .subscribe(result => {
        console.log(result)
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sizeOfFuelExpenses = result.length;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createFuelExpense() {
    let dialogRef = this.__dialog.open(
      DialogFuelExpensesComponent, {
        height: '610px',
        width: '400px',
        data: { update: false }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result.id) {
        this.openSnackBar(`Added new Fuel Expenses successfully`, "Dismiss");
        this.ngOnInit();
      } else if(result?.error) {
        this.openSnackBar(`${result}`, "Dismiss");
      }
    });
  }

  updateFuelExpenses(fuelExpenses: FuelExpenses) {
    let dialogRef = this.__dialog.open(
      DialogFuelExpensesComponent, {
        height: '610px',
        width: '400px',
        data: { update: true, fuelExpenses: fuelExpenses }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result.id) {
        this.openSnackBar(`Updated Fuel Expenses successfully`, "Dismiss");
        this.ngOnInit();
      } else if(result?.error) {
        this.openSnackBar(`${result}`, "Dismiss");
      }
    });
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}
