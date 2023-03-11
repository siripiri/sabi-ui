import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExpenses, ExpensesCategory } from '../../expenses.model';
import { ExpensesService } from '../../expenses.service';
import * as moment from 'moment';
import { map, Observable, startWith } from 'rxjs';
import { Lorry } from 'src/app/lorry/lorry.model';
import { Driver } from 'src/app/driver/driver.model';

@Component({
  selector: 'app-dialog-expenses',
  templateUrl: './dialog-expenses.component.html',
  styleUrls: ['./dialog-expenses.component.css']
})
export class DialogExpensesComponent implements OnInit {

  public expenseForm = new FormGroup({
    name: new FormControl(`${this.data.update ? this.data.expenses?.name : ''}`, Validators.required),
    amount: new FormControl(`${this.data.update ? this.data.expenses?.amount : ''}`, Validators.required),
    date: new FormControl(this.data.update ? this.splitDate(this.data.expenses?.date) : null, Validators.required),
    notes: new FormControl(`${this.data.update ? this.data.expenses?.notes : ''}`, Validators.required),
    expensesCategory: new FormControl(`${this.data.update ? this.data.expenses?.expensesCategory : ''}`, Validators.required),
    lorry: new FormControl(this.data.update ? this.data.expenses?.lorry : null ),
    driver: new FormControl(this.data.update ? this.data.expenses?.driver : null)
  });

  filteredLorry: Observable<Lorry[]> | undefined;
  filteredDriver: Observable<Driver[]> | undefined;

  filterLorryControl = new FormControl();
  filterDriverControl = new FormControl();

  public progressBar = false;
  public loading = false;
  public expensesCategories!: ExpensesCategory[];

  constructor(
    public dialogRef: MatDialogRef<DialogExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogExpenses,
    public expenseService: ExpensesService
  ) { }

  ngOnInit(): void {
    this.expenseService.getAllExpensesCategory()
      .subscribe(result => {
        this.expensesCategories = result;
      });

    this.expenseService.getAllDriverIdAndName()
      .subscribe(result => {
        this.filteredDriver = this.filterDriverControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterDriverName(value || '', result))
        )
      });

    this.expenseService.getAllLorryIdAndNumberPlate()
      .subscribe(result => {
        this.filteredLorry = this.filterLorryControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterNumberPlate(value || '', result))
        )
      });
  }

  private splitDate(date: any) {
    let split = date.split('/');
    console.log(split);
    return new Date(parseInt(split[2]), parseInt(split[1])-1, parseInt(split[0]));
  }

  private filterNumberPlate(value: string, result: Lorry[]) {
    const filterValue = value.toLowerCase();
    return result.filter(option => option.numberPlate.toLowerCase().includes(filterValue));
  }

  private filterDriverName(value: string, result: Driver[]) {
    const filterValue = value.toLowerCase();
    return result.filter(option => option.driverName.toLowerCase().includes(filterValue));
  }

  onPanelDriverClose() {
    this.filterDriverControl.setValue('');
  }

  onPanelLorryClose() {
    this.filterLorryControl.setValue('');
  }

  submitForm() {
    this.progressBar = true;
    this.loading = true;
    //save to db
    this.expenseForm.value.date = moment(this.expenseForm.value.date).format('DD/MM/YYYY');
    this.data.update === true ? this.updateExpenses() : this.createExpenses();
  }

  updateExpenses() {
    this.expenseService.patchExpenses(this.expenseForm.value, this.data.expenses?.id)
      .subscribe(result => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      },  err => {
        this.dialogRef.close(err.error);
      });
  }

  createExpenses() {
    this.expenseService.putExpenses(this.expenseForm.value)
      .subscribe(result => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, err => {
        this.dialogRef.close(err.error);
      });
  }

}
