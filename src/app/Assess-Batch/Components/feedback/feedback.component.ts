import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from 'src/app/Batch/type/note';
import { BatchModalComponent } from '../../batch-modal/batch-modal.component';
import { NoteService } from '../../Services/note.service';

@Component({
 selector: 'app-feedback',
 templateUrl: './feedback.component.html',
 styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
 noteArr: Note[];
 feedbackNote: Note = { noteId: 5050,
  noteContent: "",
  noteType: "BATCH",
  weekNumber: 1,
  batchId: -1,
  traineeId: 5358};

 constructor(private noteService: NoteService) { }
//provides the traineer feedback note for the week
getFeedbackNote(){
  //get all batch notes for the week
  this.noteService.noteEmitter
  .subscribe(result => {
    //narrow down to the singlar feedback note
    for(let n of result){
      if(n.noteType == 'BATCH'){
        this.noteArr.push(n);
      }
    }
    if(this.noteArr.length = 1){
      this.feedbackNote = this.noteArr[0];
    }
    console.log(this.noteArr);
  });
 }

 //updates feedback note on blur
feedbackNoteOnBlur(){
  console.log(this.feedbackNote);
  this.noteService.putNote(this.feedbackNote)
  .subscribe(result => {
    console.log(result);
  });
 }

ngOnInit() {
  this.getFeedbackNote();
 }
}

