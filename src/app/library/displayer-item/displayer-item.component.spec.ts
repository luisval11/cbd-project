import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayerItemComponent } from './displayer-item.component';

describe('DisplayerItemComponent', () => {
  let component: DisplayerItemComponent;
  let fixture: ComponentFixture<DisplayerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
