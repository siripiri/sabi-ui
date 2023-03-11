export interface Expenses {
    id: any;
    name: string;
    amount: string;
    date: string;
    notes: string;
    expensesCategory: string;
    lorry: lorry;
    driver: driver | null;
}

export interface ExpensesCategory {
    id: number;
    expenseCategory: string;
    api_url: string;
}

export interface DialogExpenses {
    update: boolean;
    expenses?: Expenses;
}

export interface FuelExpenses {
    id: any;
    currentPrice: string;
    literFilled: string;
    paymentMode: string;
    expenses: Expenses;
}

export interface FuelExpensesTable {
    id:number;
    name: string;
    amount: string;
    date: string;
    notes: string;
    currentPrice: string;
    literFilled: string;
    paymentMode: string;
    expensesCategory: string;
    expensesId: number;
    lorry: lorry;
}

export interface DialogFuelExpenses {
    update: boolean;
    fuelExpenses?: FuelExpensesTable;
}

export interface lorry {
  id: number;
  numberPlate: string;
}

export interface driver {
  id: number;
  driverName: string;
}
