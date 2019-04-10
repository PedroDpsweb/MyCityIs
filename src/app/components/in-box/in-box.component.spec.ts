import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InBoxComponent } from './in-box.component';

describe('InBoxComponent', () => {
  let component: InBoxComponent;
  let fixture: ComponentFixture<InBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
