import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideochamadaComponent } from './videochamada.component';

describe('VideochamadaComponent', () => {
  let component: VideochamadaComponent;
  let fixture: ComponentFixture<VideochamadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideochamadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideochamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
