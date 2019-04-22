import { Component, OnInit } from '@angular/core';
import { TraineeService } from '../../Services/trainee.service';
import { Trainee } from 'src/app/Batch/type/trainee';
import { traineeAssessment } from 'src/app/User/user/types/trainee';
import { AssessBatchGradeService } from 'src/app/Assess-Batch/Services/assess-batch-grades.service'

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  // List of test notes
  notes = [
    {
      qcStatus: 'Undefined',
      noteId: 0,
      noteFlagInputActive: false,
      trainee: {
        name: 'Hajek, Alexander',
        project: '89.45',
        verbal: '79.23',
        exam: '78.23',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    },
    {
      qcStatus: 'Superstar',
      noteId: 1,
      noteFlagInputActive: false,
      trainee: {
        name: 'Michels, Alex',
        // project: ''
        flagNotes: '',
        flagStatus: 'RED'
      }
    },
    {
      qcStatus: 'Good',
      noteId: 2,
      noteFlagInputActive: false,
      trainee: {
        name: 'Smith, Carter',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    },
    {
      qcStatus: 'Average',
      noteId: 3,
      noteFlagInputActive: false,
      trainee: {
        name: 'Erwin, Eric',
        flagNotes: '',
        flagStatus: 'RED'
      }
    },
    {
      qcStatus: 'Poor',
      noteId: 4,
      noteFlagInputActive: false,
      trainee: {
        name: 'Olney, Chris',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    }
  ];

  traineeArr: Trainee[] = [];
  assessmentArr: traineeAssessment[] = [];
  isInvalid: boolean = false;

  // Unimplemented functions
  constructor(private traineeService: TraineeService, private assessBatchGradeService: AssessBatchGradeService) { }
  ngOnInit( ) {
    this.traineeService.trainees.subscribe((traineeArr) => {
      this.traineeArr = traineeArr;
   });
   this.assessBatchGradeService.assessments.subscribe((assessmentArr) => {
     this.assessmentArr = assessmentArr;
      
   });
  }

  // Cycle the Individual Feedback Status
  cycleFlag(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.notes[i].trainee.flagStatus) {
          case 'NONE':
            newStatus = 'RED';
            break;
          case 'RED':
            newStatus = 'GREEN';
            break;
          case 'GREEN':
            newStatus = 'NONE';
            break;
        }

        // Update the status
        this.notes[i].trainee.flagStatus = newStatus;
      }
    }
  }

  // Cycle the flag notes popup
  cycleFlagNotesInput(selectedNoteId: number, enable: boolean): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {
        
          // Enable or disable the notes box popup
          this.notes[i].noteFlagInputActive = enable;
      }
    }
  }

  // Cycle the Individual Feedback Status
  cycleIF(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.notes[i].qcStatus) {
          case 'Undefined':
            newStatus = 'Superstar';
            break;
          case 'Superstar':
            newStatus = 'Good';
            break;
          case 'Good':
            newStatus = 'Average';
            break;
          case 'Average':
            newStatus = 'Poor';
            break;
          case 'Poor':
            newStatus = 'Undefined';
            break;
        }

        // Update the status
        this.notes[i].qcStatus = newStatus;
      }
    }
  }

  // Disables the associated notes text area box for 1 second.
  noteOnBlur(selectedNoteId: number, secondRound: boolean): void {

    // The first call will recursivley call this function again to re-enable the input box after 1 second
    if (!secondRound) {
      $('#note-textarea-' + selectedNoteId).prop('disabled', true);
      setInterval(this.noteOnBlur, 1000, selectedNoteId, true);
    } else {
      $('#note-textarea-' + selectedNoteId).prop('disabled', false);
    }
  }

  //Add this in blur event save function 
  validateScore(e){
   if(e.target.value < 0){
    e.target.style = "border-color : red; background-color: #fff9f9";
    e.target.placeholder = e.target.value;
    e.target.value = "";
   }else {
    e.target.style = "";
    e.target.placeholder = "";
   }
  }
}
