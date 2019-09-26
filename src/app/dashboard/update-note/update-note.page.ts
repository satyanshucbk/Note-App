import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NoteServiceService } from '../../services/note-service.service';
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit {

  updateForm: FormGroup;
  updateData: any;
  noteTime: any;

  constructor(private authService: AuthService,private router : Router,
              private location: Location, private route: ActivatedRoute,
              private noteService: NoteServiceService, public formBuilder: FormBuilder
              ) { 
                this.updateForm = this.formBuilder.group({
                  'title': ['', Validators.required],
                  'id': [''],
                   'description' : ['',Validators.required], 
                })
              }


    public back(): void {
      this.location.back();
    }
  ngOnInit() {
   
    this.route.params.subscribe(params => {
      let id = +params.id;
     let note = this.noteService.editNote(id);
     this.noteTime = note.todaysDate;
     this.updateForm.patchValue({id:id, title : note.title,description :note.desc})
    });
  }

  updateNote(){
    let todayDateTime = Date.now();
    let id = this.updateForm.value.id;
    this.noteService.updateNote({title: this.updateForm.value.title,
        desc: this.updateForm.value.description, todaysDate : todayDateTime},id);
        this.router.navigate(['note-list']);   
  }




}
