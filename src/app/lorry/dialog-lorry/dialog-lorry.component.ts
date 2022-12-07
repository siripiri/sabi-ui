import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddLorryWithDriver, DriverName } from '../lorry.model';
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

  lorryWithDriver!: AddLorryWithDriver;

  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef:MatDialogRef<DialogLorryComponent>,
    private lorryService:LorryService
  ) { }

  ngOnInit(): void {
  }

  public lorryForm = new FormGroup({
    numberPlate: new FormControl('', [Validators.required, Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')]),
    type: new FormControl('', Validators.required),
    modelNumber: new FormControl('', Validators.required),
    manufacturer: new FormControl('', Validators.required)
  });


  submitForm() {
    this.lorryService.onDriverSelect.subscribe(value => {
      if(value != null) {
        this.lorryService.postLorrywithDriver(this.lorryForm.value, value.driverId);
      }
    }).unsubscribe();
  }
}
