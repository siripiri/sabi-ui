import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public serverMessage: String = '';

  constructor(
    private authService: AuthServiceService,
    private __snackbar: MatSnackBar,
    private __router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.serverMessage = '';
    this.authService.signIn(this.loginForm.value)
      .subscribe({
        next: (res) => {
          this.openSnackBar('Logged In Successfully','Dismiss');
          localStorage.setItem('token', res.token);
          this.__router.navigate(['/location'])
        },
        error: (err) => {
          if(err.status){
            this.openSnackBar('Username or Password is invaild','Dismiss');
            this.serverMessage = 'Username or Password is invaild';
          }
          else {
            console.log(err);
          }
        }
      })
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackbar.open(message, action, { duration: 5000 });
  }

}
