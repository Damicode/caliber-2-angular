import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../../service/location.service';
import { Location } from '../../models/location';
import { AssessBatchService } from '../../../Assess-Batch/Services/assess-batch.service';
import { Batch } from 'src/app/Batch/type/batch';
import { QANote } from 'src/app/reports/Models/qanote';
import { QanoteService } from '../../service/qanote.service';
import { HomeService } from '../../service/home.service';


@Component({
  selector: 'app-home-toolbar',
  templateUrl: './home-toolbar.component.html',
  styleUrls: ['./home-toolbar.component.css']
})

export class HomeToolbarComponent implements OnInit {
  @Output() submitHomeOutput: EventEmitter<number> = new EventEmitter<number>();
  locations: Location[];
  states: string[];
  selectedState: string;
  batches: Batch[] = [];
  selectableLocations: Location[] = [];
  citiesInLocation: Location[] = [];
  selectedLocation: Location;
  showStates: boolean;
  qaNotesAllNotes: QANote[];
  qaNotesByBatch: QANote[][];
  currentDateTime: number = new Date().getTime();

  allLocations: Location;

  constructor(private locationService: LocationService, private batchService: AssessBatchService,
    private qaNoteService: QanoteService, private homeService: HomeService) {
    this.showStates = false;
  }

  ngOnInit() {
    this.initializeAllLocations();
  }


  calShowState(value: string) {
    if (value) {
      this.showStates = true;
    } else {
      this.showStates = false;
    }
    this.selectState(value);
  }

  selectState(state: string) {
    this.selectedState = state;
    this.citiesInLocation = [];
    if (state === '') {
      this.citiesInLocation = this.locations.map((element) => element);
      this.initializeAllLocations();
      //this.initializeCurrentBatches();
    } else {
      this.locations.forEach((city) => {
        if (city.state === state && this.citiesInLocation.indexOf(city) === -1) {
          this.citiesInLocation.push(city);
        }
      });
      if (this.citiesInLocation.length <= 0) {
        this.selectedLocation = null;
      }
      this.initializeCurrentBatchesFromLocations(this.citiesInLocation);
    }
  }

  selectStateAndCity(state: string, cityLocation: Location) {
    this.selectedState = state;
    this.citiesInLocation = [];
    if (state === '') {
      this.citiesInLocation = this.locations.map((element) => element);
    } else {
      this.locations.forEach((city) => {
        if (city.state === state && cityLocation.city === city.city && this.citiesInLocation.indexOf(city) === -1) {
          this.citiesInLocation.push(city);
        }
      });
      if (this.citiesInLocation.length > 0) {
      } else {
        this.selectedLocation = null;
      }
    }
    this.initializeCurrentBatchesFromLocations(this.citiesInLocation);
  }

  selectCity(city: number) {

    if (city != -1) {
      this.selectStateAndCity(this.selectedState, this.citiesInLocation[city]);
    } else {
      this.selectState(this.selectedState);
    }
  }

  initializeAllLocations() {
    this.locationService.getAllLocations().subscribe(
      (locations) => {
        this.locations = locations;
        this.selectedLocation = null;
        if (this.locations.length > 0) {
          this.initializeCurrentBatches();
        }
      });
  }

  initializeCurrentBatches() {
    this.batches = [];
    this.batchService.getCurrentBatches().subscribe(
      (batches) => {
        const locations = [];
        batches.forEach((batch) => {
          // const currentDateTime = new Date().getTime();
          //console.log(batch);
          const currentDateTime = this.currentDateTime;
          const batchDateTime = Number.parseInt(batch.endDate.toString(), 0);
          const batchStartTime = Number.parseInt(batch.startDate.toString(), 0);
          //console.log('Current date time: ' +currentDateTime);
          console.log('Batch date time: ' + batchDateTime);
          if (batchDateTime > currentDateTime) {
            // if (currentDateTime < (batchStartTime + 691200000)) {
            //   // debugger;
            //   console.log('time computation hit');
            //   let wk0qaNote: QANote = new QANote();
            //   wk0qaNote.batchId = batch.batchId;
            //   wk0qaNote.traineeId = 0;
            //   wk0qaNote.week = 0;
            //   wk0qaNote.qcStatus = 'Undefined';
            //   let tempArray: QANote[][] = [];
            //   //console.log(tempArray);
            //   let singleArr: QANote[] = new Array();
            //   singleArr.push(wk0qaNote);
            //   tempArray.push(singleArr);
            //   this.homeService.setQANotesDataStore(tempArray);
            // }
            this.batches.push(batch);
            this.locations.forEach(
              (batchLocation) => {
                if (batch.locationId === batchLocation.id) {
                  locations.push(batchLocation);
                }
              });
          }
        });
        this.locations = locations;
        this.setStatesViaLocations();
        this.homeService.setLocationsDataStore(locations);
        this.homeService.setBatchesDataStore(this.batches);
        this.initilaizeAllQANotes(this.batches);
      });
  }

  initializeCurrentBatchesFromLocations(locations: Location[]) {
    this.batches = [];
    this.batchService.getCurrentBatches().subscribe(
      (batches) => {
        batches.forEach((batch) => {
          const currentDateTime = this.currentDateTime;
          const batchDateTime = Number.parseInt(batch.endDate.toString(), 0);
          if (batchDateTime > currentDateTime) {
            let added = false;
            locations.forEach(
              (batchLocation) => {
                if (batch.locationId === batchLocation.id && !added) {
                  this.batches.push(batch);
                  added = true;
                }
              });
          }
        });
        this.setStatesViaLocations();
        this.homeService.setLocationsDataStore(this.locations);
        this.homeService.setBatchesDataStore(this.batches);
        this.initilaizeAllQANotes(this.batches);
      });
  }

  initilaizeAllQANotes(batches: Batch[]) {
    this.qaNotesByBatch = this.homeService.getQANotesDataStore();//[];
    batches.forEach(
      (element) => {
        this.qaNoteService.getAllQANotes(element).subscribe(
          (qaNotesOfBatch) => {
            // let indexOfBatch = batches.indexOf(element);
            if (!qaNotesOfBatch.length) {
              const tempBatchArray: QANote[] = [];
              let wk0qaNote: QANote = new QANote();
              wk0qaNote.batchId = element.batchId;
              wk0qaNote.traineeId = 0;
              wk0qaNote.week = 0;
              wk0qaNote.qcStatus = 'Undefined';
              //console.log(tempArray);
              tempBatchArray.push(wk0qaNote);
              this.qaNotesByBatch.push(tempBatchArray);
              this.homeService.setQANotesDataStore(this.qaNotesByBatch);
              this.submitHomeOutput.emit(this.qaNotesByBatch.length);
            }
            else {
              const tempBatchArray: QANote[] = [];
              qaNotesOfBatch.forEach(
                (qaNote) => {
                  tempBatchArray.push(qaNote);
                });
              this.qaNotesByBatch.push(tempBatchArray);
              this.homeService.setQANotesDataStore(this.qaNotesByBatch);
              this.submitHomeOutput.emit(this.qaNotesByBatch.length);
            }

          });

      });
  }

  setStatesViaLocations() {
    this.states = [];
    this.locations.forEach((element) => {
      if (!this.states.includes(element.state)) {
        this.states.push(element.state);
      }
    });
  }
}

