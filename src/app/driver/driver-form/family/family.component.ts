import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  familyInformationForm!: FormGroup

  constructor(
    private rootFormGroup: FormGroupDirective
  ) { }

  ngOnInit(): void {
    this.familyInformationForm = this.rootFormGroup.form;
  }

  public addForm() {
    const info = this.familyInformationForm.get('familyInformations') as FormArray
    info.push(this.createFamilyInformation());
  }

  public removeOrClear(i: number) {
    const info = this.familyInformationForm.get('familyInformations') as FormArray
    if(info.length > 1) {
      info.removeAt(i);
    } else {
      info.reset();
    }
  }

  private createFamilyInformation(): FormGroup {
    return new FormGroup({
      'name': new FormControl('', Validators.required),
      'relationShip': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required)
    })
  }

  get arrayForm() {
    return this.familyInformationForm.get('familyInformations') as FormArray;
  }

  changeDatePicker() {
    let info = this.familyInformationForm.value.familyInformations;
    info.forEach((_element: any, i: any) => {
      this.familyInformationForm.value.familyInformations[i].dob = moment(this.familyInformationForm.value.familyInformations[i].dob).format('DD-MM-YYYY')
    });
  }

}
