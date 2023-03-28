import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/common/snack-bar/snack-bar.component';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public registerationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [emailValidator, Validators.required]),
    password: new FormControl('', [passwordValidator, Validators.required])
  });

  public serverMessage: String = '';

  public selected = false;

  constructor(
    private authService: AuthServiceService,
    private __snackBar: MatSnackBar,
    private __router: Router
  ) { }

  ngOnInit(): void {
  }

  signUpUser() {
    this.selected = true;
    this.serverMessage = '';
    this.authService.signUp(this.registerationForm.value)
      .subscribe({
        next: (res) => {
          this.openSnackBar('Register Process has been Completed successfully','Dismiss');
          localStorage.setItem('token', res.token);
          this.__router.navigate(['/location'])
        },
        error: (err) => {
          if(err.status == 400){
            this.openSnackBar(err.error, 'Dismiss');
            this.serverMessage = err.error;
          }
          else {
            console.log(err);
          }
        }
      });
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

}

function emailValidator(control: AbstractControl): {[key: string]: any} | null {
  const validate = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(control.value);
  return !validate ? { 'lulu' : {value: control.value}} : null;
}

function passwordValidator(control: AbstractControl): {[key: string]: any} | null {
  const validate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(control.value);
  return !validate ? { 'lulu' : {value: control.value}} : null;
}
