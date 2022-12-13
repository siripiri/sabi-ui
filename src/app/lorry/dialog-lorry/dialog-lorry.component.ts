import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
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

  public progressBar = false;
  public loading = false;

  lorryWithDriver!: Lorry;

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<DialogLorryComponent>,
    private lorryService: LorryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogLorry,
    private __snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public lorryForm = new FormGroup({
    numberPlate: new FormControl(`${this.check('numberPlate')}`, [Validators.required, Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')]),
    type: new FormControl(`${this.check('type')}`, Validators.required),
    modelNumber: new FormControl(`${this.check('modelNumber')}`, Validators.required),
    manufacturer: new FormControl(`${this.check('manufacturer')}`, Validators.required)
  });

  check(arg: any): any {
    if (this.data.update) {
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
    this.lorryService.putLorry(this.lorryForm.value)
      .subscribe((result) => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, (err) => {
        if (err.status == 400) {
          this.openSnackBar(`BadResquest: ${err.error.message}`, 'Dismiss');
          this.dialogRef.close(err.error.message);
        }
        this.openSnackBar(`Error: ${err.error.text}`, "Dismiss");
        this.dialogRef.close(err.error.text);
      });
  }

  updateLorry() {
    this.lorryService.patchLorry(this.lorryForm.value)
      .subscribe((result) => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, (err) => {
        if (err.status == 400) {
          this.openSnackBar(`BadResquest: ${err.error.message}`, 'Dismiss');
          this.dialogRef.close(err.error.message);
        }
        this.openSnackBar(`Error: ${err.error}`, "Dismiss");
        this.dialogRef.close(err.error);
      });
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }
}
