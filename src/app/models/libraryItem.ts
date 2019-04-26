import {MarkType} from './markType';

export class LibraryItem {
  _id: string;
  author: string;
  title: string;
  description: string;
  mark: MarkType;
  type: string;

  constructor(
    _id: string = '',
    _author: string = '',
    _title: string = '',
    _description: string = '',
    _mark: MarkType = MarkType.pending,
    _type: string = ''
  ) {
    this._id = _id;
    this.author = _author;
    this.title = _title;
    this.description = _description;
    this.mark = _mark;
    this.type = _type;
  }
}
