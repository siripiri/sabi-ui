import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() menuToggled = new EventEmitter<boolean>();

  user: string = 'Sriprasath';

  // constructor(private authService: AuthService) { }

  logout(): void {
    console.log('Logged out');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
