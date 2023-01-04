import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverService } from '../driver.service';
import * as moment from 'moment';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {

  driverForm!: FormGroup;
  profile!: FormGroup;
  public progressBar = false;
  public loading = false;

  constructor(
    public dialogRef: MatDialogRef<DriverFormComponent>,
    public driverService: DriverService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.driverForm = this.fb.group({
      profile: this.profileForm(),
      address: this.addressForm(),
      personalInformation: this.personalInformationForm(),
      familyInformations: this.fb.array([this.familyInformationForm()]),
      emergencyContacts: this.fb.array([this.emergncyContactForm()])
    });
  }

  private profileForm(): FormGroup {
    return new FormGroup({
      'driverName': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required),
      'phoneNumber1': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'phoneNumber2': new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    });
  }

  private addressForm(): FormGroup {
    return this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{6}$')
      ]]
    });
  }

  private personalInformationForm(): FormGroup {
    return new FormGroup({
      'nationality': new FormControl('', Validators.required),
      'religion': new FormControl('', Validators.required),
      'martialStatus': new FormControl('', Validators.required),
      'employmentOfSpouse': new FormControl('', Validators.required),
      'children': new FormControl('', Validators.required),
      'whatsappNo': new FormControl('', Validators.required),
      'driverLicence': new FormControl('', Validators.required),
      'aadharCard': new FormControl('', Validators.required)
    });
  }

  private familyInformationForm(): FormGroup {
    return new FormGroup({
      'name': new FormControl('', Validators.required),
      'relationShip': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required)
    });
  }

  private emergncyContactForm(): FormGroup {
    return new FormGroup({
      'name': new FormControl('', Validators.required),
      'relationShip': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required)
    });
  }

  submit() {
    this.driverForm.value.profile.dob = moment(this.driverForm.value.profile.dob).format('DD-MM-YYYY');
    this.driverService.putDriverForm(this.driverForm.value)
      .subscribe(
        (res) => {
          this.progressBar = false;
          this.loading = false;
          this.dialogRef.close(res);
        }, 
        (err) => {
          this.dialogRef.close(err.error);
        }
      )
  }
}
