import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiServiceService } from '../api-services/api-service.service';
import { Driver } from '../driver/driver.model';
import { Lorry } from '../lorry/lorry.model';
import { Expenses, ExpensesCategory, FuelExpenses, FuelExpensesTable } from './expenses.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(
    private apiServices: ApiServiceService
  ) { }

  getAllExpenses(): Observable<Expenses[]> {
    return this.apiServices.getAllExpenses();
  }

  getAllExpensesCategory(): Observable<ExpensesCategory[]> {
    return this.apiServices.getAllExpensesCategory();
  }

  putExpenses(expenses:Expenses): Observable<Expenses> {
    return this.apiServices.putExpenses(expenses);
  }

  patchExpenses(expenses:Expenses, id:any): Observable<Expenses> {
    expenses.id = id;
    return this.apiServices.patchExpenses(expenses);
  }

  getAllFuelExpenses(): Observable<FuelExpensesTable[]> {
    return this.apiServices.getAllFuelExpenses()
      .pipe(
        map(fuelExpenses => {
          let fuelExpensesTable: FuelExpensesTable[] = [];
          fuelExpenses.forEach(fuelExpense => {
            fuelExpensesTable.push(this.fuelExpensesToFuelExpensesTable(fuelExpense));
          });
          return fuelExpensesTable;
        })
      )
  }

  getExpenseById(id: number): Observable<Expenses> {
    return this.apiServices.getExpenseById(id);
  }

  private fuelExpensesToFuelExpensesTable(fuelExpenses: FuelExpenses): FuelExpensesTable {
    return {
      id: fuelExpenses.id,
      name: fuelExpenses.expenses.name,
      amount: fuelExpenses.expenses.amount,
      date: fuelExpenses.expenses.date,
      notes: fuelExpenses.expenses.notes,
      currentPrice: fuelExpenses.currentPrice,
      literFilled: fuelExpenses.literFilled,
      paymentMode: fuelExpenses.paymentMode,
      expensesCategory: fuelExpenses.expenses.expensesCategory,
      expensesId: fuelExpenses.expenses.id,
      lorry: fuelExpenses.expenses.lorry
    }
  }

  putFuelExpenses(fuel: FuelExpenses): Observable<FuelExpenses> {
    return this.apiServices.putFuelExpenses(fuel);
  }

  patchFuelExpenses(fuel: FuelExpenses): Observable<FuelExpenses> {
    return this.apiServices.patchFuelExpenses(fuel);
  }

  getAllDriverIdAndName(): Observable<Driver[]> {
    return this.apiServices.getAllDriverIdName();
  }

  getAllLorryIdAndNumberPlate(): Observable<Lorry[]> {
    return this.apiServices.getAllLorryForTrip();
  }
}
