import {Component, Input, OnInit} from '@angular/core';
import {LibraryItem} from '../../models/libraryItem';
import {User} from '../../models/user';
import {LibraryService} from '../library.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  @Input() newItem: LibraryItem = new LibraryItem();
  @Input() author: string;
  @Input() title: string;
  @Input() description: string;
  @Input() mark: string;
  @Input() library: string;

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }

  create() {
  }

}
