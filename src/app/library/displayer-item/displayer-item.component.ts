import {Component, Input, OnInit} from '@angular/core';
import {LibraryItem} from '../../models/libraryItem';

@Component({
  selector: 'app-displayer-item',
  templateUrl: './displayer-item.component.html',
  styleUrls: ['./displayer-item.component.css']
})
export class DisplayerItemComponent implements OnInit {

  @Input() item: LibraryItem = new LibraryItem();

  constructor() { }

  ngOnInit() {
  }

}
