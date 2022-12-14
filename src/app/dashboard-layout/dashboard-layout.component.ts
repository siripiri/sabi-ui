import { Component, OnInit } from '@angular/core';
import { Menu } from './menu-model';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  opened=true;

  menu: Menu = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard'
    },
    {
      title: 'Trips',
      icon: 'commute'
    },
    {
      title: 'Lorry',
      icon: 'directions_car',
      link: '/lorry'
    },
    {
      title: 'Driver',
      icon: 'person',
      link: '/driver'
    },
    {
      title: 'Location',
      icon: 'location_on',
      link: '/location'
    }
  ];

  ngOnInit(): void {
  }

}
