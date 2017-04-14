import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamperEditComponent } from './camper-edit.component';

describe('CamperEditComponent', () => {
  let component: CamperEditComponent;
  let fixture: ComponentFixture<CamperEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamperEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamperEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
