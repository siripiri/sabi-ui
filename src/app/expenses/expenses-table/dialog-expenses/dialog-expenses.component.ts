import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExpenses, ExpensesCategory } from '../../expenses.model';
import { ExpensesService } from '../../expenses.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-expenses',
  templateUrl: './dialog-expenses.component.html',
  styleUrls: ['./dialog-expenses.component.css']
})
export class DialogExpensesComponent implements OnInit {

  public expenseForm = new FormGroup({
    name: new FormControl(`${this.data.update ? this.data.expenses?.name : ''}`, Validators.required),
    amount: new FormControl(`${this.data.update ? this.data.expenses?.amount : ''}`, Validators.required),
    date: new FormControl(`${this.data.update ? this.data.expenses?.date : ''}`, Validators.required),
    notes: new FormControl(`${this.data.update ? this.data.expenses?.notes : ''}`, Validators.required),
    expensesCategory: new FormControl(`${this.data.update ? this.data.expenses?.expensesCategory : ''}`, Validators.required)
  });

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
  }

  submitForm() {
    this.progressBar = true;
    this.loading = true;
    //save to db
    this.expenseForm.value.date = moment(this.expenseForm.value.date).format('DD-MM-YYYY');
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
