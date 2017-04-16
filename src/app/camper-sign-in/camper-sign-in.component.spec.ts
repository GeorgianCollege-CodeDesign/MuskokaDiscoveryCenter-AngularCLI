import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperSignInComponent } from './camper-sign-in.component';

describe('CamperSignInComponent', () => {
  let component: CamperSignInComponent;
  let fixture: ComponentFixture<CamperSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
