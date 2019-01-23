import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGwnodeComponent } from './list-gwnode.component';

describe('ListGwnodeComponent', () => {
  let component: ListGwnodeComponent;
  let fixture: ComponentFixture<ListGwnodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGwnodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGwnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
