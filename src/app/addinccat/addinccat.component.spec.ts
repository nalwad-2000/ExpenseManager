import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinccatComponent } from './addinccat.component';

describe('AddinccatComponent', () => {
  let component: AddinccatComponent;
  let fixture: ComponentFixture<AddinccatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinccatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinccatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
