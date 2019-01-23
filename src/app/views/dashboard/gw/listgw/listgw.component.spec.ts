import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgwComponent } from './listgw.component';

describe('ListgwComponent', () => {
  let component: ListgwComponent;
  let fixture: ComponentFixture<ListgwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListgwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListgwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
