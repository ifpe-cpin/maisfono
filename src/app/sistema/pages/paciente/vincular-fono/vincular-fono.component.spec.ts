import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularFonoComponent } from './vincular-fono.component';

describe('VincularFonoComponent', () => {
  let component: VincularFonoComponent;
  let fixture: ComponentFixture<VincularFonoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VincularFonoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VincularFonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
