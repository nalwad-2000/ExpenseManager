import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InccatComponent } from './inccat.component';

describe('InccatComponent', () => {
  let component: InccatComponent;
  let fixture: ComponentFixture<InccatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InccatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InccatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
