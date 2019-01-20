import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteFonoComponent } from './paciente-fono.component';

describe('PacienteFonoComponent', () => {
  let component: PacienteFonoComponent;
  let fixture: ComponentFixture<PacienteFonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteFonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteFonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
