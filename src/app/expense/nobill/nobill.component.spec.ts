import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NobillComponent } from './nobill.component';

describe('NobillComponent', () => {
  let component: NobillComponent;
  let fixture: ComponentFixture<NobillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NobillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NobillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
