import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LibraryItem} from '../models/libraryItem';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getMyLibrary() {
    this.http.get<LibraryItem[]>('/api/user/library').toPromise();
  }

  addItem(item: LibraryItem, library: string) {
    this.http.post('/api/library/' + library, item).toPromise();
  }

  removeItem(itemId: string) {
    this.http.delete('/api/library/' + itemId).toPromise();
  }

  editItem(item: LibraryItem, library: string) {
    this.http.put('/api/library/' + library, item).toPromise();
  }

  //TODO
  //getAllLibraries(){
  //  this.http.get<>('/api/library');
  //}

}
