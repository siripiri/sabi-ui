import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  profile!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.profile = this.rootFormGroup.form;
  }
}
