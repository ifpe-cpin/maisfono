import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FonoaudiologoComponent } from './fonoaudiologo.component';

describe('HomeComponent', () => {
  let component: FonoaudiologoComponent;
  let fixture: ComponentFixture<FonoaudiologoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FonoaudiologoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FonoaudiologoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
