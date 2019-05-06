import {Component, Inject, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LibraryItem} from '../../models/libraryItem';
import {Library} from '../../models/library';

@Component({
  selector: 'app-popup-filtered-items',
  templateUrl: './popup-filtered-items.component.html',
  styleUrls: ['./popup-filtered-items.component.css']
})
export class PopupFilteredItemsComponent implements OnInit {
  library: string;
  search: string;
  mark: string;
  loading2: boolean;
  query = '';
  results: Library = new Library('', [], [], []);

  constructor(private libraryService: LibraryService,
              public dialog: MatDialogRef<PopupFilteredItemsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.loading2 = true;
    this.library = this.data.library;
    this.search = this.data.search;
    this.mark = this.data.mark;
    this.filter();
  }

  filter() {
    this.loading2 = true;
    let query;
    if (this.search === undefined || this.search === '') {
      query = '?';
      if (this.mark !== undefined && this.mark !== '') {
        // /api/library?mark=Masterpiece
        query = query + 'mark=' + this.mark;
      }
      // /api/library?
    } else {
      query = '?search=' + this.search;
      if (this.mark !== undefined && this.mark !== '') {
        // /api/library?search=Pepe&mark=Masterpiece
        query = query + '&mark=' + this.mark;
      }
      // /api/library?search=Pepe
    }
    this.query = query;
    console.log(query);
    if (this.library !== 'All') {
      this.libraryService.filterByString(query, this.library).then(library => {
        this.results = library;
        this.loading2 = false;
      });
    } else {
      this.busca3Librerias(query);
    }
  }

  busca3Librerias(query) {
    this.libraryService.filterByString(query, 'music').then(res => {
      this.results.music = res.music;

      this.libraryService.filterByString(query, 'films').then(results2 => {
        this.results.films = results2.films;

        this.libraryService.filterByString(query, 'videogames').then(results3 => {
          this.results.videogames = results3.videogames;
          this.loading2 = false;
        }).catch(err => {
          console.log(err);
        });
        // this.results.films = results2.films;
      }).catch(err => {
        console.log(err);
      });


    }).catch(err => {
      console.log(err);
    });

    console.log('RESULTS:' + this.results);
  }

  close() {
    this.dialog.close();
  }
}
