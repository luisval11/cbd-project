import {Component, Input, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LibraryItem} from '../../models/libraryItem';
import {MarkType} from '../../models/markType';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  @Input() item: LibraryItem = new LibraryItem();
  @Input() mark: string;
  error = null;
  itemId: string;
  oldLib: string;

  constructor(private libraryService: LibraryService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idItem = this.route.paramMap.subscribe(params => {
      this.itemId = params.get('itemId');
      this.libraryService.findItem(this.itemId).then(item => {
        this.item = item;
        this.oldLib = item.type;
      }).catch(err => {
        this.error = err;
      });
    });
  }

  edit() {
    this.checkType();
    this.libraryService.editItem(this.item, this.oldLib).then(() => {
      this.error = null;
      this.router.navigate(['/user/library']);
    }).catch(err => {
      this.error = err;
    });
  }
  checkType() {
    if (this.mark === MarkType.pending) {
      this.item.mark = MarkType.pending;
    } else if (this.mark === MarkType.horrible) {
      this.item.mark = MarkType.horrible;
    } else if (this.mark === MarkType.bad) {
      this.item.mark = MarkType.bad;
    } else if (this.mark === MarkType.good) {
      this.item.mark = MarkType.good;
    } else if (this.mark === MarkType.great) {
      this.item.mark = MarkType.great;
    } else if (this.mark === MarkType.masterpiece) {
      this.item.mark = MarkType.masterpiece;
    }
  }
}
