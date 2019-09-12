import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { NoteServiceService } from '../../services/note-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
})
export class AddNotePage implements OnInit {

  addNoteForm : FormGroup;

  error_message = {
    'title': [
      {type: 'required', message: '*Please mention the tilte.'},

    ],
    'description': [
      {type: 'required', message: '*Please mention the description.'},
    ]
  }

  constructor(public router: Router, 
              private noteService: NoteServiceService,
              public formBuilder: FormBuilder,
              private authService: AuthService,
              private location: Location) { 

                this.addNoteForm = this.formBuilder.group({
                  title : new FormControl('', Validators.compose([
                    Validators.required
                  ])),
                  description : new FormControl('', Validators.compose([
                    Validators.required
                  ])) 
                })
              }

              public back(): void {
                this.location.back();
              }
       
  ngOnInit() {
  }

  saveNote() {
    let todayDateTime = Date.now();
    console.log(todayDateTime);
    this.noteService.addNote({title: this.addNoteForm.value.title,
        desc: this.addNoteForm.value.description, todaysDate : todayDateTime})
       
        this.router.navigate(['note-list']);     
  }


}
