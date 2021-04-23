import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexpcatComponent } from './addexpcat.component';

describe('AddexpcatComponent', () => {
  let component: AddexpcatComponent;
  let fixture: ComponentFixture<AddexpcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddexpcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddexpcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
