import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Driver, Lorry } from '../lorry.model';
import { LorryService } from '../lorry.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-assign-driver',
  templateUrl: './assign-driver.component.html',
  styleUrls: ['./assign-driver.component.css']
})
export class AssignDriverComponent implements OnInit {

  selectedValue:Driver | undefined;
  datasource:Driver[] | undefined;
  selected = new FormControl('valid', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  @Output() assignDriver = new EventEmitter<string>();

  constructor(private lorryService:LorryService) { }

  ngOnInit(): void {
    this.lorryService.getDriverNamesDropDown()
                .subscribe(results => {
                  this.datasource = results;
                });
  }

  submit() {
    console.log(this.selectedValue?.driverName);
    //this.assigndriver.emit(this.selectedValue?.driverName);
  } 

  async clickedValue(driverName:Driver): Promise<void> {
    this.lorryService.onDriverSelect.next(driverName);
  }

}
