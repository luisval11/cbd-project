import {Component, Input, OnInit} from '@angular/core';
import {LibraryService} from '../library.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  @Input() itemId: string;

  constructor(private libraryService: LibraryService,  private router: Router) { }

  ngOnInit() {
  }

  delete() {
    console.log(this.itemId);
    this.libraryService.removeItem(this.itemId)
      .then(() => {
        this.router.navigate(['/user/library']);
      });
  }

}
