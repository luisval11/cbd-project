import {Component, Input, OnInit} from '@angular/core';
import {LibraryItem} from '../../models/libraryItem';
import {LibraryService} from '../library.service';
import {MarkType} from '../../models/markType';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  @Input() newItem: LibraryItem = new LibraryItem();
  @Input() mark: string;
  @Input() library: string;
  marksTypes: string[] = [];
  error = null;
  constructor(private libraryService: LibraryService,  private router: Router) { }

  ngOnInit() {
    this.marksTypes.push(MarkType.pending);
    this.marksTypes.push(MarkType.bad);
    this.marksTypes.push(MarkType.good);
    this.marksTypes.push(MarkType.great);
    this.marksTypes.push(MarkType.horrible);
    this.marksTypes.push(MarkType.masterpiece);
  }

  create() {
    this.checkType();
    this.libraryService.addItem(this.newItem, this.library).then(item => {
     this.error = null;
     this.router.navigate(['/user/library']);
    }).catch(err => {
     this.error = err;
     console.log(err);
    });
  }

  checkType() {
    if (this.mark === MarkType.pending) {
      this.newItem.mark = MarkType.pending;
    } else if (this.mark === MarkType.horrible) {
      this.newItem.mark = MarkType.horrible;
    } else if (this.mark === MarkType.bad) {
      this.newItem.mark = MarkType.bad;
    } else if (this.mark === MarkType.good) {
      this.newItem.mark = MarkType.good;
    } else if (this.mark === MarkType.great) {
      this.newItem.mark = MarkType.great;
    } else if (this.mark === MarkType.masterpiece) {
      this.newItem.mark = MarkType.masterpiece;
    }
  }
}
