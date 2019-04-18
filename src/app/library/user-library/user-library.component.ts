import { Component, OnInit } from '@angular/core';
import {LibraryService} from "../library.service";
import {LibraryItem} from '../../models/libraryItem';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent implements OnInit {

  public music: LibraryItem[] = [];
  public videogames: LibraryItem[] = [];
  public films: LibraryItem[] = [];

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
    this.libraryService.getMyLibrary().then(library => {
      this.music = library.music;
      this.films = library.films;
      this.videogames = library.videogames;
    }).catch(err => {
      console.log(err);
    });
  }

}
