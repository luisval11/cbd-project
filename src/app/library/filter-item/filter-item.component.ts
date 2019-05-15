import {Component, Input, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';
import {LibraryItem} from '../../models/libraryItem';
import {Library} from '../../models/library';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {PopupFilteredItemsComponent} from '../popup-filtered-items/popup-filtered-items.component';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {

  libreria: Library = new Library('', [], [], []);
  musics: LibraryItem[] = [];
  filmss: LibraryItem[] = [];
  videogamess: LibraryItem[] = [];
  results: LibraryItem[] = [];
  loading = true;
  loading2 = true;
  logged : boolean;
  @Input() search: string;
  @Input() library: string;
  @Input() mark: string;


  constructor(private libraryService: LibraryService, private dialog: MatDialog, private cookieService: CookieService) { }

  ngOnInit() {
    if (this.cookieService.get('auth_token') !== '') {
      this.logged = true;
    } else {
      this.logged = false;
    }
    this.loading = true;
    this.libraryService.findLibraries().then(lib => {
      console.log(lib[0]);
      this.libreria = Object.assign(this.libreria, lib[0]);
      this.musics = this.libreria.music;
      this.filmss = this.libreria.films;
      this.videogamess = this.libreria.videogames;
      this.loading = false;
    }).catch(err => {
      console.log(err);
    });
    this.results = [];
    this.loading2 = false;
  }

  filterPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100%';
    dialogConfig.data = {
      search: this.search,
      library: this.library,
      mark: this.mark
    };
    console.log(dialogConfig.data);
    this.dialog.open(PopupFilteredItemsComponent, dialogConfig);
  }
}
