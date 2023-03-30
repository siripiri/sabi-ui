import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = 'Sriprasath';

  constructor(
    private authService: AuthServiceService,
    private __router: Router,
    private __snackBar: MatSnackBar
  ) { }

  logout(): void {
    this.authService.logOut();
    this.openSnackBar('Logged Out Successfully','Dismiss');
    this.__router.navigate(['/signIn'])
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }

  ngOnInit(): void {
  }

}
