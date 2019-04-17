import {Component, Input, OnInit} from '@angular/core';
import {LibraryItem} from '../../models/libraryItem';
import {User} from '../../models/user';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  user: User = new User();
  
  @Input() newItem: LibraryItem = new LibraryItem();
  @Input() author: string;
  @Input() title: string;
  @Input() description: string;
  @Input() mark: string;

  constructor() { }

  ngOnInit() {
    this.user = Object.assign(new User(), this.user);

  }

}
