import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PacienteDashComponent } from '../paciente/paciente-dash/paciente-dash.component';


describe('PacienteDashComponent', () => {
  let component: PacienteDashComponent;
  let fixture: ComponentFixture<PacienteDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
