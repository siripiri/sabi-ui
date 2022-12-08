import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address, DialogLocation, LocationApi } from '../location.model';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-dialog-location',
  templateUrl: './dialog-location.component.html',
  styleUrls: ['./dialog-location.component.css']
})
export class DialogLocationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogLocation,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
  }

  public locationForm = new FormGroup({
    distributorName: new FormControl(`${this.data.update ? this.data.locationTable?.distributorName : ''}`, [Validators.required]),
    address: new FormControl(`${this.data.update ? this.data.locationTable?.address : ''}`, Validators.required),
    city: new FormControl(`${this.data.update ? this.data.locationTable?.city : ''}`, Validators.required),
    state: new FormControl(`${this.data.update ? this.data.locationTable?.state : ''}`, Validators.required),
    zipcode: new FormControl(`${this.data.update ? this.data.locationTable?.zipcode : ''}`, [Validators.required, Validators.pattern('^[0-9]{6}$')]),
    kmAllocated: new FormControl(`${this.data.update ? this.data.locationTable?.kmAllocated : ''}`, [Validators.required, Validators.pattern('^[0-9]*')])
  });

  public progressBar = false;

  public loading = false;

  submitForm() {
    this.progressBar = true;
    this.loading = true;
    //save to db
    this.data.update === true ? this.updateLocation() : this.createLocation();
  }

  updateLocation() {
    this.locationService.patchLocation(this.locationService.formToLocationApi(this.locationForm.value), this.data.locationTable!.id)
      .subscribe(
        (res) => {
          this.progressBar = false;
          this.loading = false;
          this.dialogRef.close(res);
        },
        (err) => {
          this.dialogRef.close(err.error.text);
        }
      );
  }
  createLocation() {
    this.locationService.putLocation(this.locationService.formToLocationApi(this.locationForm.value))
      .subscribe(
        (res) => {
          this.progressBar = false;
          this.loading = false;
          this.dialogRef.close(res);
        },
        (err) => {
          this.dialogRef.close(err.error.text);
        }
      );
  }
}
