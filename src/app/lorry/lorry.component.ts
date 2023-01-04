import { Component, OnInit } from '@angular/core';
import { breadcrumb } from '../common/common.model';

@Component({
  selector: 'app-lorry',
  templateUrl: './lorry.component.html',
  styleUrls: ['./lorry.component.css']
})
export class LorryComponent implements OnInit {

  links:breadcrumb[] = [
    {
      link: '/',
      name: 'Dashboard',
      active: true
    },
    {
      link: '/driver',
      name: 'Lorry Details',
      active: false
    }
  ];

  constructor() { }

  ngOnInit(): void {}
  
}
