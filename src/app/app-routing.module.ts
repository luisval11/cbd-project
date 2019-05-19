import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogoutComponent} from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {UserLibraryComponent} from './library/user-library/user-library.component';
import {NewItemComponent} from './library/new-item/new-item.component';
import {EditItemComponent} from './library/edit-item/edit-item.component';
import {FilterItemComponent} from './library/filter-item/filter-item.component';
import {PopupFilteredItemsComponent} from './library/popup-filtered-items/popup-filtered-items.component';

const routes: Routes = [
  {path: '', redirectTo: '/library/search', pathMatch: 'full'},
  // User
  {path: 'user/library', component: UserLibraryComponent},
  {path: 'user/library/create', component: NewItemComponent},
  {path: 'user/library/edit/:itemId', component: EditItemComponent},
  {path: 'library/search', component: FilterItemComponent},
  // Login / Logout
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
