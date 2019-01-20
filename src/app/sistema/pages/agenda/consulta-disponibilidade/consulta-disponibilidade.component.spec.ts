import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDisponibilidadeComponent } from './consulta-disponibilidade.component';

describe('ConsultaDisponibilidadeComponent', () => {
  let component: ConsultaDisponibilidadeComponent;
  let fixture: ComponentFixture<ConsultaDisponibilidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaDisponibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
