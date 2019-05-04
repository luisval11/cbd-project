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

import {CookieService} from 'ngx-cookie-service';
import { FilterItemComponent } from './library/filter-item/filter-item.component';
import { PopupFilteredItemsComponent } from './library/popup-filtered-items/popup-filtered-items.component';
import {MatDialogModule, MatSnackBarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    UserLibraryComponent,
    FilterItemComponent,
    PopupFilteredItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    LoginService,
    LibraryService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [PopupFilteredItemsComponent]
})
export class AppModule {
}
