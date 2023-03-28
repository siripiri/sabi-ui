import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    private __router: Router
  ) { }

  logout(): void {
    this.authService.logOut();
    this.__router.navigate(['/signUp'])
  }

  ngOnInit(): void {
  }

}
