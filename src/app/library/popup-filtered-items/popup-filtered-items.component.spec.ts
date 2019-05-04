import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFilteredItemsComponent } from './popup-filtered-items.component';

describe('PopupFilteredItemsComponent', () => {
  let component: PopupFilteredItemsComponent;
  let fixture: ComponentFixture<PopupFilteredItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupFilteredItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupFilteredItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
