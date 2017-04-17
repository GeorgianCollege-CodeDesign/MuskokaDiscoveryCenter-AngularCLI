import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperSignOutComponent } from './camper-sign-out.component';

describe('SignoutFormComponent', () => {
  let component: CamperSignOutComponent;
  let fixture: ComponentFixture<CamperSignOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperSignOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperSignOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
