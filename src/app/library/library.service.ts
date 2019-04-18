import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LibraryItem} from '../models/libraryItem';
import {Library} from '../models/library';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient) { }

  getMyLibrary() {
    return this.http.get<Library>('/api/user/library').toPromise();
  }

  addItem(item: LibraryItem, library: string) {
    return this.http.post('/api/library/' + library, item).toPromise();
  }

  removeItem(itemId: string) {
    return this.http.delete('/api/library/' + itemId).toPromise();
  }

  editItem(item: LibraryItem, library: string) {
    return this.http.put('/api/library/' + library, item).toPromise();
  }

}
