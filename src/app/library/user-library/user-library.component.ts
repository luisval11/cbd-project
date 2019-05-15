import { Component, OnInit } from '@angular/core';
import {LibraryService} from '../library.service';
import {LibraryItem} from '../../models/libraryItem';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent implements OnInit {

  public musicList: LibraryItem[] = [];
  public videogamesList: LibraryItem[] = [];
  public filmsList: LibraryItem[] = [];

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.libraryService.onRefreshLibrary.subscribe(() => {
      this.refreshLibrary();
    });
    this.libraryService.getMyLibrary().then(library => {
      this.musicList = library.music;
      this.filmsList = library.films;
      this.videogamesList = library.videogames;
    }).catch(err => {
      console.log(err);
    });
  }

  refreshLibrary() {
    this.libraryService.getMyLibrary().then(library => {
      this.musicList = library.music;
      this.filmsList = library.films;
      this.videogamesList = library.videogames;
    }).catch(err => {
      console.log(err);
    });
  }
}
