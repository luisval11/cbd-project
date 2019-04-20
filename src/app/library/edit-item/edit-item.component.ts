import {Component, Input, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';
import {Router} from '@angular/router';
import {LibraryItem} from '../../models/libraryItem';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input() item: LibraryItem = new LibraryItem();

  constructor(private libraryService: LibraryService, private router: Router) { }

  ngOnInit() {
  }

  edit() {

  }
}
