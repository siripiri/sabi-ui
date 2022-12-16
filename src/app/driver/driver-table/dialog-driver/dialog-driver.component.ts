import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/location/location.model';
import { DialogDriver, Driver } from '../../../lorry/lorry.model';
import { LorryService } from '../../../lorry/lorry.service';

@Component({
  selector: 'app-dialog-driver',
  templateUrl: './dialog-driver.component.html',
  styleUrls: ['./dialog-driver.component.css']
})
export class DialogDriverComponent implements OnInit {

  public progressBar = false;
  public loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogDriverComponent>,
    private lorryService: LorryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogDriver,
    private __snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public driverForm = new FormGroup({
    driverName: new FormControl(`${this.check('driverName', null)}`, [Validators.required]),
    dob: new FormControl(`${this.check('dob', null)}`, Validators.required),
    childrenDetails: new FormControl(`${this.check('childrenDetails', null)}`, Validators.required),
    address: new FormControl(`${this.check('address', 'address')}`, Validators.required),
    city: new FormControl(`${this.check('address', 'city')}`, Validators.required),
    state: new FormControl(`${this.check('address', 'state')}`, Validators.required),
    zipcode: new FormControl(`${this.check('address', 'zipcode')}`, [Validators.required, Validators.pattern('^[0-9]{6}$')])
  });

  check(arg:any, arg2:any) {
    if(this.data.update) {
      const str: keyof Driver = arg;
      let data = this.data.driver[str];
      if(arg2) {
        const str1: keyof Address = arg2;
        //return data[str1];
      }
      return data;
    }
    return '';
  }

  submitForm() {
    this.progressBar = true;
    this.loading = true;
    //save to db
    this.data.update === true ? this.updateDriver() : this.createDriver();
  }

  updateDriver() {
    this.lorryService.putDriver(this.driverForm.value)
      .subscribe(result => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, (err) => {
        if(err.error.status == 400) {
          this.openSnackBar(`BadResquest: ${err.error.message}`, 'Dismiss');
          this.dialogRef.close(err.error.message);
        }
        this.openSnackBar(`Error: ${err.error.text}`, "Dismiss");
        this.dialogRef.close(err.error.text);
      })
  }

  createDriver() {
    this.lorryService.putDriver(this.driverForm.value)
      .subscribe(result => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, (err) => {
        if(err.error.status == 400) {
          this.openSnackBar(`BadResquest: ${err.error.message}`, 'Dismiss');
          this.dialogRef.close(err.error.message);
        }
        this.openSnackBar(`Error: ${err.error.text}`, "Dismiss");
        this.dialogRef.close(err.error.text);
      });
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}
