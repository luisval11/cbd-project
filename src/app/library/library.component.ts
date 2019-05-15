import { Component, OnInit } from '@angular/core';
import {LibraryService} from './library.service';
import {LibraryItem} from '../models/libraryItem';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public library: LibraryItem[] = [];
  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }

}
