import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { CustomPipe } from '../../pipe/custom.pipe';
import { NoteListPage } from './note-list.page';
// import { SortComponent } from '../../modal/sort/sort.component';

const routes: Routes = [
  {
    path: '',
    component: NoteListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,FormsModule,
    IonicModule,
    // IonicModule.forRoot({hardwareBackButton: false}),
    RouterModule.forChild(routes)
  ],
  entryComponents: [],
  declarations: [NoteListPage,CustomPipe ]
})
export class NoteListPageModule {}
