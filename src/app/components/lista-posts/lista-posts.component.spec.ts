import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPostsComponent } from './lista-posts.component';

describe('ListaPostsComponent', () => {
  let component: ListaPostsComponent;
  let fixture: ComponentFixture<ListaPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
