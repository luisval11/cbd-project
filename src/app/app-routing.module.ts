import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogoutComponent} from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {UserLibraryComponent} from './library/user-library/user-library.component';
import {NewItemComponent} from './library/new-item/new-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  //User
  { path: 'user/library', component: UserLibraryComponent},
  { path: 'user/library/create', component: NewItemComponent},
  { path: 'user/library/edit/:itemId', component: NewItemComponent},
  // Login / Logout
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
