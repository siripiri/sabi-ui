import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogLorry, Lorry } from '../lorry.model';
import { LorryService } from '../lorry.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog-lorry',
  templateUrl: './dialog-lorry.component.html',
  styleUrls: ['./dialog-lorry.component.css']
})
export class DialogLorryComponent implements OnInit {

  public progressBar = true;
  public loading = false;

  lorryWithDriver!: Lorry;

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DialogLorryComponent>,
    private lorryService: LorryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogLorry
  ) { }

  ngOnInit(): void {
  }

  public lorryForm = new FormGroup({
    numberPlate: new FormControl(`${this.check('numberPlate')}`, [Validators.required, Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')]),
    type: new FormControl(`${this.check('type')}`, Validators.required),
    modelNumber: new FormControl(`${this.check('modelNumber')}`, Validators.required),
    manufacturer: new FormControl(`${this.check('manufacturer')}`, Validators.required)
  });

  check(arg: any): any{
    if(this.data.update){
      const str: keyof Lorry = arg;
      return this.data.lorry[str];
    }
    return '';
  }

  submitForm() {
    this.progressBar = true;
    this.loading = true;
    // save to db
    this.data.update === true ? this.updateLorry() : this.createLorry();
  }

  createLorry() {
    this.lorryService.onDriverSelect.subscribe(value => {
      if (value != null) {
        console.log(value);
        this.lorryService.postLorrywithDriver(this.lorryForm.value, value.id)
          .subscribe((result) => {
            this.progressBar = false;
            this.loading = false;
            result.driverName = value.driverName;
            this.dialogRef.close(result);
          }, (err) => {
            this.dialogRef.close(err.error.text);
          });
      }
      else {
        this.lorryService.postLorryWithoutDriver(this.lorryForm.value)
          .subscribe((result) => {
            this.progressBar = false;
            this.loading = false;
            this.dialogRef.close(result);
          }, (err) => {
            this.dialogRef.close(err.error.text);
          });
      }
    }).unsubscribe();
  }

  updateLorry() {

  }
}
