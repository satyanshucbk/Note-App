import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  noteArray = [];
  constructor() { }
 
  addNote(noteData:any) {
    let count = 0;
    if(JSON.parse(localStorage.getItem('note')) instanceof Array){
       count = JSON.parse(localStorage.getItem('note')).length;
    }
   if(JSON.parse(localStorage.getItem('note'))!=null || count!=0){
     let oldArray = JSON.parse(localStorage.getItem('note'));

     oldArray.push(noteData);
    
     localStorage.setItem('note',JSON.stringify(oldArray));
    }
    else{
     console.log("else");
      this.noteArray.push(noteData);
      localStorage.setItem('note',JSON.stringify(this.noteArray));
    }
    
   return true;
  }
  
  deleteNote(key){
    let notelist = JSON.parse(localStorage.getItem('note'));
    notelist.splice(key,1);
    localStorage.setItem('note',JSON.stringify(notelist));
    return true;
   }
   
   editNote(key) {
    let notelist = JSON.parse(localStorage.getItem('note'));
    return notelist[key];
    }

    updateNote(data,id) {
      let note = JSON.parse(localStorage.getItem('note'));
      console.log(note);
      
       note[id].title = data.title;
       note[id].desc = data.desc;
      return localStorage.setItem('note',JSON.stringify(note));
       

      }

      sortNote(sortType){
        let notelist = JSON.parse(localStorage.getItem('note'));
        if(sortType=="new"){
          notelist.sort((a: any, b: any) => {
            console.log(a.todaysDate);
            return b.todaysDate - a.todaysDate;
            
          });
          
        }
        else{
          notelist.sort((a: any, b: any) => {
            return a.todaysDate - b.todaysDate;
            
          });
        }

        return notelist;
      }
}
