import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogAssign, Driver, Lorry } from '../lorry.model';
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

  selectedValue: Driver | undefined;
  datasource: Driver[] | undefined;
  selected = new FormControl('valid', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  @Output() assignDriver = new EventEmitter<string>();
  progressBar: boolean = false;

  constructor(
    private lorryService: LorryService,
    private dialogRef: MatDialogRef<AssignDriverComponent>,
    private __snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: DialogAssign
  ) { }

  ngOnInit(): void {
    this.lorryService.getDriverNamesDropDown()
      .subscribe(results => {
        this.datasource = results;
      });
  }

  submitForm() {
    this.progressBar = true;
    this.data.lorry.driverName = this.selected.value.driverName;
    this.lorryService.assignDriver(this.data.lorry)
      .subscribe(result => {
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

  async clickedValue(driverName: Driver): Promise<void> {
    this.lorryService.onDriverSelect.next(driverName);
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }
}
