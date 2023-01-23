import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogFuelExpenses, Expenses, FuelExpenses } from '../../expenses.model';
import { ExpensesService } from '../../expenses.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-fuel-expenses',
  templateUrl: './dialog-fuel-expenses.component.html',
  styleUrls: ['./dialog-fuel-expenses.component.css']
})
export class DialogFuelExpensesComponent implements OnInit {

  public expenseForm = new FormGroup({
    name: new FormControl(`${this.data.update == true ? this.data.fuelExpenses?.name : ''}`, Validators.required),
    amount: new FormControl(`${this.data.update == true ? this.data.fuelExpenses?.amount : ''}`, Validators.required),
    date: new FormControl(`${this.data.update == true ? this.data.fuelExpenses?.date : ''}`, Validators.required),
    notes: new FormControl(`${this.data.update == true ? this.data.fuelExpenses?.notes : ''}`, Validators.required),
    currentPrice: new FormControl(`${this.data.update == true ? this.data.fuelExpenses?.currentPrice : ''}`, Validators.required),
    paymentMode: new FormControl(`${this.data.update == true ? this.data.fuelExpenses?.paymentMode : ''}`, Validators.required)
  });

  public progressBar = false;
  public loading = false;
  expenses!: Expenses;

  constructor(
    public dialogRef: MatDialogRef<DialogFuelExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogFuelExpenses,
    public expenseService: ExpensesService
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.progressBar = true;
    this.loading = true;
    //save to db
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
      date: moment(this.expenseForm.value.date).format('DD-MM-YYYY'),
      notes: this.expenseForm.value.notes,
      expensesCategory: 'Fuel'
    }

    let result = parseFloat(this.expenseForm.value.amount) / parseFloat(this.expenseForm.value.currentPrice);

    return {
      id: this.data.update == true ? this.data.fuelExpenses?.id : null,
      currentPrice: this.expenseForm.value.currentPrice,
      literFilled: String(result),
      paymentMode: this.expenseForm.value.paymentMode,
      expenses: expenses
    }
  }

}
