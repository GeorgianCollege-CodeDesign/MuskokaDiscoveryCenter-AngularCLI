import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperDetailsComponent } from './camper-details.component';

describe('CamperDetailsComponent', () => {
  let component: CamperDetailsComponent;
  let fixture: ComponentFixture<CamperDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
