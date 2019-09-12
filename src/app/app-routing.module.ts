import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'forgot-password', loadChildren: './auth/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'email-verification', loadChildren: './auth/email-verification/email-verification.module#EmailVerificationPageModule' },
  { path: 'reset-password', loadChildren: './auth/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'note-list', loadChildren: './dashboard/note-list/note-list.module#NoteListPageModule' },
  { path: 'add-note', loadChildren: './dashboard/add-note/add-note.module#AddNotePageModule' },
  { path: 'update-note/:id', loadChildren: './dashboard/update-note/update-note.module#UpdateNotePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
