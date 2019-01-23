import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnodeComponent } from './listnode.component';

describe('ListnodeComponent', () => {
  let component: ListnodeComponent;
  let fixture: ComponentFixture<ListnodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListnodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
