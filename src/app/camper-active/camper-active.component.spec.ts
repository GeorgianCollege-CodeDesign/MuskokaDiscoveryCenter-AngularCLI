import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperActiveComponent } from './camper-active.component';

describe('CamperActiveComponent', () => {
  let component: CamperActiveComponent;
  let fixture: ComponentFixture<CamperActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
