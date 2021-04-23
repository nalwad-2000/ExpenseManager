import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartexpComponent } from './piechartexp.component';

describe('PiechartexpComponent', () => {
  let component: PiechartexpComponent;
  let fixture: ComponentFixture<PiechartexpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartexpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
