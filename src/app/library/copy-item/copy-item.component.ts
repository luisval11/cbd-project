import {Component, Input, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';
import {MarkType} from '../../models/markType';
import {Router} from '@angular/router';

@Component({
  selector: 'app-copy-item',
  templateUrl: './copy-item.component.html',
  styleUrls: ['./copy-item.component.css']
})
export class CopyItemComponent implements OnInit {

  @Input() itemId: string;
  constructor(private libraryService: LibraryService, private router: Router) { }

  ngOnInit() {
  }

  copy() {
    this.libraryService.findItem(this.itemId).then(itemFound => {
      itemFound.mark = MarkType.pending;
      this.libraryService.addItem(itemFound, itemFound.type).then(() => {
        this.router.navigate(['/user/library']);
      });
    });
  }

}
