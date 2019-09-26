import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NoteServiceService } from '../../services/note-service.service';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.page.html',
  styleUrls: ['./note-list.page.scss'],
})
export class NoteListPage implements OnInit {
  
  
  noteList: any = [];
  filteredNotes: [];
  searchText : any;
  options : any;
  subscribe: any;

 addNote() {
    this.router.navigate(['add-note']);
  }

  

  constructor(public router: Router,
              private noteService: NoteServiceService,
              public alertController: AlertController,
              public platform: Platform,
              private splashScreen: SplashScreen,
              private statusBar: StatusBar
              ) 
              {
                
               
                this.platform.backButton.subscribe(async () => {
                 
                  if (this.router.isActive('/note-list', true) && this.router.url === '/note-list') {
                    const alert = await this.alertController.create({
                      header: 'Do you want to close app?',
                      buttons: [
                        {
                          text: 'Cancel',
                          role: 'cancel'
                        }, {
                          text: 'Close',
                          handler: () => {
                          navigator['app'].exitApp();
                          }
                        }
                      ]
                    });
                    
                    await alert.present();
                  } else{
                    history.back();
                  }
                });
                this.initializeApp();
              }


  ngOnInit() {

    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd ) {
        this.getList();
      }
    });
  }

  getList() {
    this.noteList = JSON.parse(localStorage.getItem('note'));
    console.log(this.noteList);
  }


  async deleteNote(key) {
  // console.log(key)
  // this.noteService.deleteNote(key);
  // this.getList();
  
  const alert = await this.alertController.create({
    header: 'Confirm Delete',
    message: 'Do you confirm to delete?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log(key)
          this.noteService.deleteNote(key);
          this.getList();
        }
      }
    ]
  });
  await alert.present();
  
}
 updateNote(key){
  this.router.navigate(['update-note',key]);
 }

 sortBydate(option){
  let sortNote = this.noteService.sortNote(option);
  localStorage.setItem('note',JSON.stringify(sortNote));
  this.getList();
  }

  logout() {
    this.router.navigate(['login']);
  }

  initializeApp() {
   
  if (this.router.isActive('/note-list', true) && this.router.url === '/note-list'){
   
    this.platform.ready().then(() => {
      
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('Can`t go back');
        }, false);
      });
     
      this.statusBar.styleDefault();
    });
  }
     
  }

}
