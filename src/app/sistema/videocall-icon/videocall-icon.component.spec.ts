import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocallIconComponent } from './videocall-icon.component';

describe('VideocallIconComponent', () => {
  let component: VideocallIconComponent;
  let fixture: ComponentFixture<VideocallIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocallIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocallIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
