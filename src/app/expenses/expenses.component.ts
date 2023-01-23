import { Component, OnInit } from '@angular/core';
import { breadcrumb } from '../common/common.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  links:breadcrumb[] = [
    {
      link: '/',
      name: 'Dashboard',
      active: true
    },
    {
      link: '/driver',
      name: 'Expenses Details',
      active: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
