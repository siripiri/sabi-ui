import { Component, Input, OnInit } from '@angular/core';
import { breadcrumb } from '../common.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  links!: breadcrumb[];

  constructor() { }

  ngOnInit(): void {
  }

}
