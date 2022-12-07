import { Component, OnInit } from '@angular/core';
import { Menu } from './menu-model';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor() { }

  opened=true;

  menu: Menu = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard',
      color: '#ABB2B9'
    },
    {
      title: 'Trips',
      icon: 'commute',
      color: '#ABB2B9'
    },
    {
      title: 'Lorry',
      icon: 'directions_car',
      link: '/lorry',
      color: '#ABB2B9'
    },
    {
      title: 'Location',
      icon: 'location_on',
      link: '/location',
      color: '#ABB2B9'
    }
  ];

  ngOnInit(): void {
  }

}
