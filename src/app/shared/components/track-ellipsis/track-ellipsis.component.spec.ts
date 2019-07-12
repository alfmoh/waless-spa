/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrackEllipsisComponent } from './track-ellipsis.component';

describe('TrackEllipsisComponent', () => {
  let component: TrackEllipsisComponent;
  let fixture: ComponentFixture<TrackEllipsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackEllipsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackEllipsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
