import {LibraryItem} from './libraryItem';


export class Library {
  _id: string;
  music: LibraryItem[];
  films: LibraryItem[];
  videogames: LibraryItem[];

  constructor(
    _id: string,
    _music: [],
    _films: [],
    _videogames: []
  ) {
    this._id = _id;
    this.music = _music;
    this.films = _films;
    this.videogames = _videogames;
  }
}
