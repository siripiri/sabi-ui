import { Component, OnInit } from '@angular/core';
import { breadcrumb } from '../common/common.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  links:breadcrumb[] = [
    {
      link: '/',
      name: 'Dashboard',
      active: true
    },
    {
      link: '/driver',
      name: 'Location Details',
      active: false
    }
  ];

  constructor() { }

  ngOnInit(): void {}

}
