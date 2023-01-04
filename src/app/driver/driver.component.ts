import { Component, OnInit } from '@angular/core';
import { breadcrumb } from '../common/common.model';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  links:breadcrumb[] = [
    {
      link: '/',
      name: 'Dashboard',
      active: true
    },
    {
      link: '/driver',
      name: 'Driver Details',
      active: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
