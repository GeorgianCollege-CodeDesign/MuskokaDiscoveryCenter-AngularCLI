import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperRegisterComponent } from './camper-register.component';

describe('CamperRegisterComponent', () => {
  let component: CamperRegisterComponent;
  let fixture: ComponentFixture<CamperRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
