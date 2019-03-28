import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPostComponent } from './subir-post.component';

describe('SubirPostComponent', () => {
  let component: SubirPostComponent;
  let fixture: ComponentFixture<SubirPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
