import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLibraryComponent } from './library/user-library/user-library.component';
import {LogoutComponent} from './logout/logout.component';
import {LoginComponent} from './login/login.component';
import {EditItemComponent} from './library/edit-item/edit-item.component';
import {DisplayerItemComponent} from './library/displayer-item/displayer-item.component';
import {DeleteItemComponent} from './library/delete-item/delete-item.component';
import {NewItemComponent} from './library/new-item/new-item.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './login/login.service';
import {LibraryService} from './library/library.service';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    UserLibraryComponent,
    LoginComponent,
    LogoutComponent,
    NewItemComponent,
    EditItemComponent,
    DisplayerItemComponent,
    DeleteItemComponent,
    UserLibraryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [
    LoginService,
    LibraryService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
