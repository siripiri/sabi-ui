import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Expenses } from '../expenses.model';
import { ExpensesService } from '../expenses.service';
import { DialogExpensesComponent } from './dialog-expenses/dialog-expenses.component';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.css']
})
export class ExpensesTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'amount', 'date', 'notes', 'expensesCategory', 'lorry', 'driver', 'action'];
  dataSource!: MatTableDataSource<Expenses>;
  sizeOfExpenses: number = 0;

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
    this.expenseService.getAllExpenses()
      .subscribe(result => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sizeOfExpenses = result.length;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createExpense() {
    let dialogRef = this.__dialog.open(
      DialogExpensesComponent, {
        height: '610px',
        width: '400px',
        data: { update: false }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result.id) {
        this.openSnackBar(`Added new Expenses successfully`, "Dismiss");
        this.ngOnInit();
      } else if(result?.error) {
        this.openSnackBar(`${result}`, "Dismiss");
      }
    });
  }

  updateExpenses(expenses: Expenses) {
    let dialogRef = this.__dialog.open(
      DialogExpensesComponent, {
        height: '500px',
        width: '400px',
        data: { update: true, expenses: expenses }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if(result.id) {
        this.openSnackBar(`Updated Expenses successfully`, "Dismiss");
        this.ngOnInit();
      } else {
        this.openSnackBar(`${result}`, "Dismiss");
      }
    })
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}
