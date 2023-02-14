import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Location } from 'src/app/location/location.model';
import { Lorry } from 'src/app/lorry/lorry.model';
import { TripsService } from '../../trips.service';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-trips',
  templateUrl: './dialog-trips.component.html',
  styleUrls: ['./dialog-trips.component.css']
})
export class DialogTripsComponent implements OnInit {

  public tripForm = new FormGroup({
    plantToDistributor: new FormControl('', Validators.required),
    distributorToPlant: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    plantStart: new FormControl('', [Validators.required, Validators.pattern('^(1[0-2]|0?[1-9]):[0-5][0-9] (am|pm)$')]),
    desEnd: new FormControl('', [Validators.required, Validators.pattern('^(1[0-2]|0?[1-9]):[0-5][0-9] (am|pm)$')]),
    desStart: new FormControl('', [Validators.required, Validators.pattern('^(1[0-2]|0?[1-9]):[0-5][0-9] (am|pm)$')]),
    plantEnd: new FormControl('', [Validators.required, Validators.pattern('^(1[0-2]|0?[1-9]):[0-5][0-9] (am|pm)$')]),
    location: new FormControl('', Validators.required),
    lorry: new FormControl('', Validators.required)
  });

  filteredLocation: Observable<Location[]> | undefined;
  filteredLorry: Observable<Lorry[]> | undefined;

  filterLocationControl = new FormControl();
  filterLorryControl = new FormControl();

  locationId = 0;
  lorryId = 0;

  public progressBar = false;
  public loading = false;

  constructor(
    private tripService: TripsService,
    private dialogRef: MatDialogRef<DialogTripsComponent>,
    private __snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.tripService.getAllLocation()
      .subscribe(result => {
        this.filteredLocation = this.filterLocationControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterDistributor(value || '', result))
        )
      });

    this.tripService.getAllLorry()
      .subscribe(result => {
        this.filteredLorry = this.filterLorryControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterNumberPlate(value || '', result))
        )
      });
  }

  private filterDistributor(value: string, result: Location[]) {
    const filterValue = value.toLowerCase();
    return result.filter(option => option.distributorName.toLowerCase().includes(filterValue));
  }

  private filterNumberPlate(value: string, result: Lorry[]) {
    const filterValue = value.toLowerCase();
    return result.filter(option => option.numberPlate.toLowerCase().includes(filterValue));
  }

  onPanelLocationClose() {
    this.filterLocationControl.setValue('');
  }

  onPanelLorryClose() {
    this.filterLorryControl.setValue('');
  }

  submit() {
    this.progressBar = true;
    this.loading = true;
    // save to db
    this.createTrip();
  }

  createTrip() {
    this.tripForm.value.date = moment(this.tripForm.value.date).format('DD/MM/YYYY')
    this.tripService.saveTrip(this.tripForm.value)
      .subscribe(result => {
        this.progressBar = false;
        this.loading = false;
        this.dialogRef.close(result);
      }, (err) => {
        this.openSnackBar(`Error: ${err.error}`, 'Dismiss');
        this.dialogRef.close(err.error);
      });
  }

  openSnackBar(message: string, action: string | undefined) {
    this.__snackBar.open(message, action, { duration: 5000 });
  }
}
