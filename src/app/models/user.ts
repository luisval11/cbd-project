import {libraryItem} from './libraryItem';


export class User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  dni: string;
  music: libraryItem[];
  films: libraryItem[];
  videogames: libraryItem[];

  constructor(
    _id: '',
    _firstName: '',
    _lastName: '',
    _username: '',
    _password: '',
    _dni: '',
    _music: [],
    _films: [],
    _videogames: []
  ) {
    this._id = _id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.username = _username;
    this.password = _password;
    this.dni = _dni;
    this.music = _music;
    this.films = _films;
    this.videogames = _videogames;
  }
}
