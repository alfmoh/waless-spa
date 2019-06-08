import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseItemComponent } from './browse-item.component';

describe('BrowseItemComponent', () => {
  let component: BrowseItemComponent;
  let fixture: ComponentFixture<BrowseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
