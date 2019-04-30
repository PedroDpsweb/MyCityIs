import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarModalComponent } from './star-modal.component';

describe('StarModalComponent', () => {
  let component: StarModalComponent;
  let fixture: ComponentFixture<StarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
