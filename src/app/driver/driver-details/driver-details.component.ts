import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { breadcrumb } from 'src/app/common/common.model';
import { DriverForm } from '../driver.model';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  driver!: DriverForm;
  links!:breadcrumb[];

  constructor(
    private driverService: DriverService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.links = [
      {
        link: '/',
        name: 'Dashboard',
        active: true
      },
      {
        link: '/driver',
        name: 'Driver Details',
        active: true
      }
    ];

    this.route.params.subscribe(params => {
      this.driverService.getDriverById(params['id'])
          .subscribe(driver => {
            this.driver = driver;
            this.links.push({
              link: `/driver/${driver.profile.id}`,
              name: driver.profile.driverName,
              active: false
            })
          })
    });
  }

  calculateAge(dob: string) {
    let splitValues = dob.split('/');
    let dob1 = new Date(parseInt(splitValues[2]), parseInt(splitValues[1]), parseInt(splitValues[0]));
    let diff = Date.now() - dob1.getTime();
    let _age = new Date(diff);
    return Math.abs(_age.getUTCFullYear() - 1970);
  }

}
