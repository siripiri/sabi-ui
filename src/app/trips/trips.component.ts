import { Component, OnInit } from '@angular/core';
import { breadcrumb } from '../common/common.model';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  links: breadcrumb[] = [
    {
      link: '/',
      name: 'Dashboard',
      active: true
    },
    {
      link: '/trip',
      name: 'Trips Details',
      active: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
