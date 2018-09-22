import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteAdminComponent } from './paciente-admin.component';

describe('PacienteAdminComponent', () => {
  let component: PacienteAdminComponent;
  let fixture: ComponentFixture<PacienteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
