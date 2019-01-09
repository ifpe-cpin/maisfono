import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadeFormComponent } from './disponibilidade-form.component';

describe('DisponibilidadeFormComponent', () => {
  let component: DisponibilidadeFormComponent;
  let fixture: ComponentFixture<DisponibilidadeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilidadeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
