import { Component, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.component.html',
  styleUrls: ['./emergency-contact.component.css'],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]],
  }]
})
export class EmergencyContactComponent implements OnInit {

  emergencyContactForm!: FormGroup;

  constructor(
    private rootFormGroup: FormGroupDirective,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.emergencyContactForm = this.rootFormGroup.form;
  }

  private createEmergencyContact(): FormGroup {
    return new FormGroup({
      'name': new FormControl('', Validators.required),
      'relationShip': new FormControl('', Validators.required),
      'phoneNumber': new FormControl('', Validators.required)
    });
  }

  public addForm() {
    const info = this.emergencyContactForm.get('emergencyContacts') as FormArray
    info.push(this.createEmergencyContact());
  }

  public removeOrClear(i: number) {
    const info = this.emergencyContactForm.get('emergencyContacts') as FormArray
    if(info.length > 1) {
      info.removeAt(i);
    } else {
      info.reset();
    }
  }

  get arrayForm() {
    return this.emergencyContactForm.get('emergencyContacts') as FormArray;
  }
}
