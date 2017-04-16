import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutFormComponent } from './camper-sign-out.component';

describe('SignoutFormComponent', () => {
  let component: SignoutFormComponent;
  let fixture: ComponentFixture<SignoutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
