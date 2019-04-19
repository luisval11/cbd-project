import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LibraryItem} from '../models/libraryItem';
import {Library} from '../models/library';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  public onRefreshLibrary: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getMyLibrary() {
    return this.http.get<Library>('/api/user/library').toPromise();
  }

  addItem(item: LibraryItem, library: string) {
    return this.http.post('/api/user/library/' + library, item).toPromise();
  }

  removeItem(itemId: string) {
    const query = this.http.delete('/api/user/library/' + itemId).toPromise();
    this.onRefreshLibrary.emit();
    return query;
  }

  editItem(item: LibraryItem, library: string) {
    return this.http.put('/api/user/library/' + library, item).toPromise();
  }

}
