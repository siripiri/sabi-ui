import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogFuelExpenses, Expenses, FuelExpenses } from '../../expenses.model';
import { ExpensesService } from '../../expenses.service';
import * as moment from 'moment';
import { Lorry } from 'src/app/lorry/lorry.model';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-dialog-fuel-expenses',
  templateUrl: './dialog-fuel-expenses.component.html',
  styleUrls: ['./dialog-fuel-expenses.component.css']
})
export class DialogFuelExpensesComponent implements OnInit {

  public expenseForm = new FormGroup({
    name: new FormControl(`${this.data.update ? this.data.fuelExpenses?.name : ''}`, Validators.required),
    amount: new FormControl(`${this.data.update ? this.data.fuelExpenses?.amount : ''}`, Validators.required),
    date: new FormControl(this.data.update ? this.splitDate(this.data.fuelExpenses?.date) : null, Validators.required),
    notes: new FormControl(`${this.data.update ? this.data.fuelExpenses?.notes : ''}`, Validators.required),
    currentPrice: new FormControl(`${this.data.update ? this.data.fuelExpenses?.currentPrice : ''}`, Validators.required),
    paymentMode: new FormControl(`${this.data.update ? this.data.fuelExpenses?.paymentMode : ''}`, Validators.required),
    lorry: new FormControl(this.data.update ? this.data.fuelExpenses?.lorry : null, Validators.required)
  });

  filteredLorry: Observable<Lorry[]> | undefined;

  filterLorryControl = new FormControl();

  public progressBar = false;
  public loading = false;
  expenses!: Expenses;

  constructor(
    public dialogRef: MatDialogRef<DialogFuelExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFuelExpenses,
    public expenseService: ExpensesService
  ) { }

  ngOnInit(): void {
    this.expenseService.getAllLorryIdAndNumberPlate()
      .subscribe(result => {
        this.filteredLorry = this.filterLorryControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterNumberPlate(value || '', result))
        )
      });
  }

  private filterNumberPlate(value: string, result: Lorry[]) {
    const filterValue = value.toLowerCase();
    return result.filter(option => option.numberPlate.toLowerCase().includes(filterValue));
  }

  private splitDate(date: any) {
    let split = date.split('/');
    console.log(split);
    return new Date(parseInt(split[2]), parseInt(split[1])-1, parseInt(split[0]));
  }

  onPanelLorryClose() {
    this.filterLorryControl.setValue('');
  }

  submitForm() {
    this.progressBar = true;
    this.loading = true;
    //save to db
    console.log(this.expenseForm.value);
    this.data.update === true ? this.updateExpenses() : this.createExpenses();
  }

  createExpenses() {
    this.expenseService.putFuelExpenses(this.fuelToExpenses())
      .subscribe(result => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, err => {
        this.dialogRef.close(err.error);
      });
  }

  updateExpenses() {
    this.expenseService.patchFuelExpenses(this.fuelToExpenses())
      .subscribe(result => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, err => {
        this.dialogRef.close(err.error);
      });
  }

  fuelToExpenses(): FuelExpenses {
    let expenses = {
      id: this.data.update == true ? this.data.fuelExpenses?.expensesId : null,
      name: this.expenseForm.value.name,
      amount: this.expenseForm.value.amount,
      date: moment(this.expenseForm.value.date).format('DD/MM/YYYY'),
      notes: this.expenseForm.value.notes,
      expensesCategory: 'Fuel',
      lorry: this.expenseForm.value.lorry,
      driver: null
    }

    let result = parseFloat(this.expenseForm.value.amount) / parseFloat(this.expenseForm.value.currentPrice);

    return {
      id: this.data.update == true ? this.data.fuelExpenses?.id : null,
      currentPrice: this.expenseForm.value.currentPrice,
      literFilled: String(result.toFixed(2)),
      paymentMode: this.expenseForm.value.paymentMode,
      expenses: expenses
    }
  }

}
