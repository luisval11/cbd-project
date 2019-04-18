import {Library} from './library';

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  dni: string;
  library: Library;

  constructor(
    _id: '',
    _firstName: '',
    _lastName: '',
    _username: '',
    _password: '',
    _dni: '',
    _library: Library = null,

  ) {
    this._id = _id;
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.username = _username;
    this.password = _password;
    this.dni = _dni;
    this.library = _library;
  }
}
